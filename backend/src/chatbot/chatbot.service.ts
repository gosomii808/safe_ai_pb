import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EncryptionService } from '../security/encryption.service';
import { AnonymizerService } from '../security/anonymizer.service';

@Injectable()

export class ChatbotService {
  private readonly logger = new Logger(ChatbotService.name);
  private openai: any = null;
  private readonly modelName: string;

  constructor(
    private readonly prisma: PrismaService,
    private readonly encryption: EncryptionService,
    private readonly anonymizer: AnonymizerService,
  ) {
    const apiKey = process.env.OPENAI_API_KEY ?? '';
    this.modelName = process.env.OPENAI_MODEL ?? 'gpt-4o-mini';
    if (apiKey) {
      try {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const OpenAI = require('openai');
        this.openai = new OpenAI({ apiKey });
      } catch (err) {
        this.logger.error(`OpenAI 패키지 로드에 실패했습니다. fallback 모드로 전환합니다: ${(err as Error).message}`);
      }
    } else {
      this.logger.warn('OPENAI_API_KEY가 설정되지 않아 fallback 모드로 작동합니다.');
    }
  }


  async handleMessage(userId: string, message: string): Promise<{
    answer: string;
    mode: 'openai' | 'fallback';
    usedContext: string[];
  }> {
    const startTime = Date.now();
    const cleanMessage = message.trim();
    const usedContext: string[] = [];

    // 보안센터 관련 질문 감지 시 우선 안내
    if (
      cleanMessage.includes('보안') ||
      cleanMessage.includes('해킹') ||
      cleanMessage.includes('암호') ||
      cleanMessage.includes('개인정보') ||
      cleanMessage.includes('보호') ||
      cleanMessage.includes('안전')
    ) {
      return {
        answer: 'Arch는 고객님의 소중한 자산 정보를 안전하게 보호하기 위해 모든 민감 데이터를 AES-256 알고리즘으로 강력하게 암호화하여 저장하며, AI 분석 요청 시 비식별 처리(Masking/Anonymization)를 수행하여 전송하고 있습니다. 상세한 보안 현황과 보안 강도, 실시간 접근 로그는 [보안센터] 페이지에서 직접 확인하실 수 있습니다.',
        mode: 'fallback',
        usedContext: ['보안센터 페이지 안내'],
      };
    }

    // 1. 사용자 및 포트폴리오 데이터 조회 및 비식별화/요약
    let portfolioSummary = '포트폴리오 자산 정보 없음';
    let assetCount = 0;
    try {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { portfolioAssets: true },
      });

      if (user && user.portfolioAssets && user.portfolioAssets.length > 0) {
        assetCount = user.portfolioAssets.length;
        const assets = user.portfolioAssets;

        // 원본 민감정보(quantity, avgBuyPrice, investmentAmount) 복호화 후 비식별화(AnonymizerService 사용)
        const decryptedAssets = assets.map((a: any) => {
          let quantityDecrypted: string | null | undefined = null;
          let avgBuyPriceDecrypted: string | null | undefined = null;
          let investmentAmountDecrypted: string | null | undefined = null;
          try {
            if (a.quantity) quantityDecrypted = this.encryption.decrypt(a.quantity);
          } catch {}
          try {
            if (a.avgBuyPrice) avgBuyPriceDecrypted = this.encryption.decrypt(a.avgBuyPrice);
          } catch {}
          try {
            if (a.investmentAmount) investmentAmountDecrypted = this.encryption.decrypt(a.investmentAmount);
          } catch {}


          return {
            market: a.market,
            ticker: a.ticker,
            stockName: a.stockName,
            sector: a.sector,
            targetRatio: a.targetRatio,
            quantity: quantityDecrypted,
            avgBuyPrice: avgBuyPriceDecrypted,
            investmentAmount: investmentAmountDecrypted,
          };
        });

        // 비식별 데이터화 (quantityBand, avgBuyPriceBand, investmentAmountBand 등으로 변환)
        const anonymized = this.anonymizer.anonymizePortfolioForAi(decryptedAssets);

        // 시장별/섹터별 자산 분포 비중 요약 생성
        const marketMap: Record<string, number> = {};
        const sectorMap: Record<string, number> = {};
        let totalCount = anonymized.length;

        for (const item of anonymized) {
          if (item.market) {
            marketMap[item.market] = (marketMap[item.market] || 0) + 1;
          }
          if (item.sector) {
            sectorMap[item.sector] = (sectorMap[item.sector] || 0) + 1;
          }
        }

        const marketSummary = Object.entries(marketMap)
          .map(([m, c]) => `${m}: ${Math.round((c / totalCount) * 100)}%`)
          .join(', ');
        const sectorSummary = Object.entries(sectorMap)
          .map(([s, c]) => `${s}: ${Math.round((c / totalCount) * 100)}%`)
          .join(', ');

        portfolioSummary = `총 보유 자산 개수: ${totalCount}개, 시장 비중: { ${marketSummary} }, 주요 섹터 비중: { ${sectorSummary} }`;
        usedContext.push('사용자 포트폴리오 비중 요약');
      }
    } catch (err) {
      this.logger.warn(`포트폴리오 요약 조회 실패: ${(err as Error).message}`);
    }

    // 2. 최근 AI 리포트 요약 가능하면 조회
    let aiReportSummary = '최근 AI 리포트 없음';
    try {
      const latestSnapshot = await this.prisma.portfolioAnalysisSnapshot.findFirst({
        where: { userId },
        orderBy: { snapshotDate: 'desc' },
      });
      if (latestSnapshot && latestSnapshot.summary) {
        aiReportSummary = latestSnapshot.summary.substring(0, 150) + '...';
        usedContext.push('최근 AI 리포트 요약');
      }
    } catch (err) {
      this.logger.warn(`AI 리포트 요약 조회 실패: ${(err as Error).message}`);
    }

    // 3. 경제 이벤트 요약 가능하면 조회 (최근 3개)
    let economicEventSummary = '최근 주요 경제 이벤트 없음';
    try {
      const recentEvents = await this.prisma.economicEvent.findMany({
        orderBy: { eventDate: 'desc' },
        take: 3,
      });
      if (recentEvents && recentEvents.length > 0) {
        economicEventSummary = recentEvents
          .map((e: any) => `[${e.eventDate}] ${e.title} (${e.importance} 중요도, category: ${e.category})`)
          .join('; ');
        usedContext.push('최근 주요 경제 이벤트 요약');
      }
    } catch (err) {
      this.logger.warn(`경제 이벤트 요약 조회 실패: ${(err as Error).message}`);
    }

    // OpenAI 호출 가능한 상태가 아닐 때 예외 없이 즉각 fallback 처리
    if (!this.openai) {
      const fallbackAns = this.getFallbackResponse(cleanMessage, portfolioSummary, economicEventSummary);
      const latencyMs = Date.now() - startTime;
      await this.logAiRequest(userId, 'CHATBOT', this.modelName, false, latencyMs, 'OPENAI_API_KEY_MISSING');
      return {
        answer: fallbackAns,
        mode: 'fallback',
        usedContext,
      };
    }

    try {
      const systemPrompt = `너는 Arch의 금융 포트폴리오 안내 챗봇이다.
투자 추천, 매수/매도 지시, 수익률 보장을 하지 않는다.
사용자의 포트폴리오와 시장 데이터를 바탕으로 리스크, 분산도, 경제 이벤트 영향을 설명한다.
개인정보나 원본 민감 투자정보를 노출하지 않는다.
답변은 한국어로 짧고 명확하게 3~5문장 이내로 한다.

[사용자 데이터 요약]
- 포트폴리오 자산 요약: ${portfolioSummary}
- 최근 AI 리포트 요약: ${aiReportSummary}
- 최근 주요 경제 이벤트: ${economicEventSummary}`;

      const response = await this.openai.chat.completions.create({
        model: this.modelName,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: cleanMessage },
        ],
        max_tokens: 250,
        temperature: 0.3,
      });

      const answer = response.choices[0]?.message?.content?.trim() || '';
      const latencyMs = Date.now() - startTime;
      const tokens = response.usage?.total_tokens ?? 0;

      await this.logAiRequest(userId, 'CHATBOT', this.modelName, true, latencyMs, null, tokens);

      return {
        answer,
        mode: 'openai',
        usedContext,
      };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`OpenAI API 호출 실패: ${err.message}`);
      const latencyMs = Date.now() - startTime;
      await this.logAiRequest(userId, 'CHATBOT', this.modelName, false, latencyMs, err.name || 'API_ERROR');

      const fallbackAns = this.getFallbackResponse(cleanMessage, portfolioSummary, economicEventSummary);
      return {
        answer: fallbackAns,
        mode: 'fallback',
        usedContext,
      };
    }
  }

  private getFallbackResponse(message: string, portfolio: string, events: string): string {
    const msg = message.toLowerCase();
    if (msg.includes('포트폴리오') || msg.includes('어때') || msg.includes('자산')) {
      return `현재 보유 중인 포트폴리오는 다음과 같이 분산되어 있습니다: ${portfolio}. 자산 배분의 다양성을 유지하여 특정 종목에 편중되는 현상을 방지하는 것이 리스크 관리의 핵심입니다. 자세한 리스크 및 동조화 위험 분석은 포트폴리오 분석 페이지를 참조해 주십시오.`;
    }
    if (msg.includes('경제') || msg.includes('이벤트') || msg.includes('금리') || msg.includes('환율')) {
      return `최근 발표된 주요 경제 이벤트 정보입니다: ${events}. 기준금리 결정 및 주요 매크로 지표 변동은 보유 자산군(주식, 채권 등)의 할인율과 수익률에 큰 영향을 줄 수 있으므로 리스크 모니터링이 필요합니다.`;
    }
    return '안녕하세요! Arch 금융 챗봇입니다. 현재 임시 연결 상태이거나 서버 트래픽으로 인해 규칙 기반 답변을 드립니다. 포트폴리오 현황, 시장 비중 정보, 또는 최근 경제 이벤트가 포트폴리오에 미치는 영향 등에 대해 물어보시면 상세히 답변 드리겠습니다.';
  }

  private async logAiRequest(
    userId: string,
    requestType: string,
    modelName: string,
    success: boolean,
    latencyMs: number,
    errorCode: string | null = null,
    tokens: number | null = null,
  ) {
    try {
      await this.prisma.aiRequestLog.create({
        data: {
          userId,
          requestType,
          modelName,
          success,
          latencyMs,
          errorCode,
          tokenUsage: tokens,
          createdAt: new Date(),
        } as any,
      });
    } catch (err) {
      this.logger.error(`AiRequestLog 기록 실패: ${(err as Error).message}`);
    }
  }
}
