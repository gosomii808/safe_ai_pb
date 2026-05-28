// backend/src/ai-report/ai-report-refiner.service.ts
//
// (선택) 규칙 기반 리포트의 자연어 문장만 Claude로 다듬습니다.
// - 숫자/등급/점수/추천 카테고리/상관계수는 절대 바꾸지 않습니다 (규칙 결과가 사실의 원천).
// - 민감 정보(이메일/전화/정확한 수량·금액)는 프롬프트에 넣지 않습니다.
// - 페르소나: 낙관에 경도되지 않는 헤지펀드 수석 리스크 관리자(CRO) + 중립·객관적 재무분석가.
//
// ANTHROPIC_API_KEY 가 없으면 다듬기를 건너뛰고 원본을 그대로 반환합니다.

import { Injectable, Logger } from '@nestjs/common';
import { AiReportResponse } from './ai-report.types';

@Injectable()
export class AiReportRefinerService {
  private readonly logger = new Logger(AiReportRefinerService.name);
  private readonly apiKey = process.env.ANTHROPIC_API_KEY ?? '';
  private readonly model =
    process.env.ANTHROPIC_MODEL ?? 'claude-sonnet-4-20250514';

  isEnabled(): boolean {
    return this.apiKey.length > 0;
  }

  async refine(report: AiReportResponse): Promise<AiReportResponse> {
    if (!this.isEnabled() || report.status !== 'ready') return report;

    const editable = {
      summaryDescription: report.summary.description,
      cards: report.cards.map((c) => ({
        id: c.id,
        summary: c.summary,
        recommendation: c.recommendation,
      })),
    };

    const system = [
      // 1) 역할 및 페르소나
      '너는 낙관주의에 경도되지 않고 오직 데이터로만 리포트를 작성하는',
      "'헤지펀드 수석 리스크 관리자(Chief Risk Officer)'이자 중립적이고 객관적인 재무분석가다.",
      '사용자의 기분을 맞춰주기 위한 무조건적인 칭찬이나 낙관적 전망은 엄격히 금지한다.',
      // 핵심 제약
      '입력 JSON의 문장을 더 자연스럽고 간결한 한국어로 다듬되,',
      '숫자, 퍼센트, 등급, 상관계수, 종목명, 추천 카테고리, 사실관계, 의미는 절대 바꾸지 마라.',
      '새로운 사실/수치를 만들어내지 마라. 백엔드가 준 수치는 그대로 인용하라.',
      // 2) 최신성 편향 방어 (문장 톤 유지)
      '단기 급등·고점·과매수(RSI) 경고가 담긴 문장은 위험을 약화시키지 말고 단호한 톤을 유지하라.',
      '"최근 흐름이 좋으니 앞으로도 유망합니다"처럼 과거 단기 성과를 미래 수익으로 연결 짓는 표현은 절대 쓰지 마라.',
      // 상관/동조화
      '표면적 종목 분산 뒤의 자산 동조화 위험을 다룰 때 위험을 희석하지 말고 날카롭게 유지하라.',
      // 3) 규제
      '특정 종목 매수/매도 권유 표현은 쓰지 마라.',
      // 출력 형식
      '반드시 입력과 동일한 JSON 구조로만 응답하라. 마크다운/설명/코드펜스 금지.',
    ].join(' ');

    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-api-key': this.apiKey,
          'anthropic-version': '2023-06-01',
        },
        body: JSON.stringify({
          model: this.model,
          max_tokens: 1500,
          system,
          messages: [
            {
              role: 'user',
              content: `다음 JSON의 문장만 다듬어 동일 구조 JSON으로 반환:\n${JSON.stringify(editable)}`,
            },
          ],
        }),
      });

      if (!res.ok) {
        this.logger.warn(`Claude refine 실패: ${res.status}`);
        return report;
      }

      const data = await res.json();
      const text: string = (data.content ?? [])
        .map((b: { type: string; text?: string }) =>
          b.type === 'text' ? b.text : '',
        )
        .join('')
        .replace(/```json|```/g, '')
        .trim();

      const parsed = JSON.parse(text) as typeof editable;

      return {
        ...report,
        summary: {
          ...report.summary,
          description: parsed.summaryDescription ?? report.summary.description,
        },
        cards: report.cards.map((card, i) => {
          const p = parsed.cards?.[i];
          if (!p || p.id !== card.id) return card;
          return {
            ...card,
            summary: p.summary ?? card.summary,
            recommendation: p.recommendation ?? card.recommendation,
          };
        }),
      };
    } catch (err) {
      this.logger.warn(`Claude refine 예외: ${(err as Error).message}`);
      return report;
    }
  }
}
