// backend/src/ai-report/ai-report.analyzer.ts
//
// 순수 계산 로직(규칙 기반). DB/Prisma/Nest에 의존하지 않는 순수 함수 모음입니다.
// 서비스가 DB에서 가져온 값을 여기에 넘겨 리포트를 만듭니다.
//
// 이번 버전 반영 사항:
//  1. 자산군 분류: 주식 / 채권(CD 91일, 국고채 3년물·10년물 등)
//  2. 상관관계: 백엔드가 준 correlationMatrix / highCorrelationAlerts /
//     macro·microSectorExposure 를 "가공 없이" 분산도 분석에 반영
//  3. 거시: 하드코딩 시그널 제거. 신선도 데이터 없으면 단정하지 않음
//  4. 최신성 편향: recencyBiasDefenseData(return1M/return1Y/rsi/distanceFromATH) 경고

import {
  AiReportCard,
  AiReportGrade,
  AiReportProductRecommendation,
  AiReportResponse,
  AssetClass,
  BondType,
  AI_REPORT_DISCLAIMER,
} from './ai-report.types';

// ── 입력 형태 ────────────────────────────────────────────

export interface AnalyzerHolding {
  ticker: string;
  stockName: string;
  market: string;
  sector: string | null;
  assetClass: AssetClass; // EQUITY | BOND
  bondType?: BondType | null; // 채권일 때만
  quantity: number;
  marketValue: number | null;
  hasMarketPrice: boolean;
  per?: number | null;
  pbr?: number | null;
}

export interface AnalyzerSnapshot {
  riskScore: number | null;
  diversification: number | null;
  dailyPnL: number | null;
  totalValue: number | null;
}

// 상관관계 입력 (백엔드 correlation 엔진이 주는 그대로)
export interface CorrelationInput {
  macroSectorExposure?: Record<string, number>; // { Tech: 75.2, Cyclicals: 24.8 }
  microSectorExposure?: Record<string, number>;
  highCorrelationAlerts?: string[]; // 가공 없이 그대로 인용
  correlationMatrix?: Record<string, Record<string, number>>;
}

// 최신성 편향 방어 데이터 (종목별)
export interface RecencyDatum {
  ticker: string;
  stockName: string;
  return1M?: number | null; // % (예: 35.2)
  return1Y?: number | null; // %
  rsi?: number | null; // 0~100
  distanceFromATH?: number | null; // % (0에 가까울수록 역사적 고점)
}

export interface AnalyzerProfile {
  riskType: string | null;
  investmentGoal: string | null;
}

export interface AnalyzerInput {
  profile: AnalyzerProfile;
  holdings: AnalyzerHolding[];
  snapshot: AnalyzerSnapshot | null;
  correlation: CorrelationInput | null; // 없으면 단정 안 함
  recency: RecencyDatum[]; // 없으면 빈 배열
  dataQuality: {
    hasPortfolio: boolean;
    hasMarketPrices: boolean;
    hasAnalysisSnapshot: boolean;
    hasMacroData: boolean;
    hasCorrelationData: boolean;
    hasRecencyData: boolean;
    missing: string[];
  };
}

// ── 유틸 ──────────────────────────────────────────────────

const pct = (v: number) => Math.round(v * 1000) / 10; // 0.279 -> 27.9
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

function scoreToGrade(score: number): AiReportGrade {
  if (score >= 95) return 'A+';
  if (score >= 88) return 'A';
  if (score >= 82) return 'A-';
  if (score >= 76) return 'B+';
  if (score >= 70) return 'B';
  if (score >= 64) return 'B-';
  if (score >= 58) return 'C+';
  if (score >= 52) return 'C';
  if (score >= 45) return 'C-';
  return 'D';
}

// 채권 세부 분류 한글 라벨
const bondLabel: Record<BondType, string> = {
  CD_91D: 'CD 91일물',
  KTB_3Y: '국고채 3년물',
  KTB_10Y: '국고채 10년물',
  BOND_ETF: '채권 ETF',
  OTHER_BOND: '기타 채권',
};

interface Composition {
  totalValue: number;
  // 자산군 비중
  equityRatio: number;
  bondRatio: number;
  bondBreakdown: Array<{ type: BondType; ratio: number }>;
  // 주식 내 섹터/종목
  bySector: Map<string, number>;
  byTicker: Array<{ name: string; ticker: string; value: number; ratio: number }>;
  sectorRatios: Array<{ sector: string; ratio: number }>;
  topTicker: { name: string; ratio: number } | null;
  topSector: { sector: string; ratio: number } | null;
  numHoldings: number;
  numEquityHoldings: number;
  numSectors: number;
  overseasRatio: number;
}

function buildComposition(holdings: AnalyzerHolding[]): Composition {
  const valued = holdings.filter(
    (h) => h.marketValue != null && h.marketValue > 0,
  );
  const totalValue = valued.reduce((s, h) => s + (h.marketValue as number), 0);

  const bySector = new Map<string, number>();
  const bondByType = new Map<BondType, number>();
  let equityValue = 0;
  let bondValue = 0;
  let overseasValue = 0;

  const byTicker = valued
    .filter((h) => h.assetClass === 'EQUITY')
    .map((h) => {
      const value = h.marketValue as number;
      const sector = h.sector ?? '기타';
      bySector.set(sector, (bySector.get(sector) ?? 0) + value);
      return { name: h.stockName, ticker: h.ticker, value, ratio: 0 };
    });

  for (const h of valued) {
    const value = h.marketValue as number;
    if (h.assetClass === 'BOND') {
      bondValue += value;
      const t = h.bondType ?? 'OTHER_BOND';
      bondByType.set(t, (bondByType.get(t) ?? 0) + value);
    } else {
      equityValue += value;
      if (h.market && h.market.toUpperCase() !== 'KRX' && h.market !== '국내') {
        overseasValue += value;
      }
    }
  }

  byTicker.forEach((t) => {
    t.ratio = totalValue > 0 ? t.value / totalValue : 0;
  });
  byTicker.sort((a, b) => b.ratio - a.ratio);

  const sectorRatios = [...bySector.entries()]
    .map(([sector, value]) => ({
      sector,
      ratio: totalValue > 0 ? value / totalValue : 0,
    }))
    .sort((a, b) => b.ratio - a.ratio);

  const bondBreakdown = [...bondByType.entries()]
    .map(([type, value]) => ({ type, ratio: totalValue > 0 ? value / totalValue : 0 }))
    .sort((a, b) => b.ratio - a.ratio);

  return {
    totalValue,
    equityRatio: totalValue > 0 ? equityValue / totalValue : 0,
    bondRatio: totalValue > 0 ? bondValue / totalValue : 0,
    bondBreakdown,
    bySector,
    byTicker,
    sectorRatios,
    topTicker: byTicker[0]
      ? { name: byTicker[0].name, ratio: byTicker[0].ratio }
      : null,
    topSector: sectorRatios[0]
      ? { sector: sectorRatios[0].sector, ratio: sectorRatios[0].ratio }
      : null,
    numHoldings: valued.length,
    numEquityHoldings: byTicker.length,
    numSectors: bySector.size,
    overseasRatio: totalValue > 0 ? overseasValue / totalValue : 0,
  };
}

// ── 임계값 ───────────────────────────────────────────────
const SINGLE_SECTOR_WARN = 0.3;
const SINGLE_TICKER_WARN = 0.25;
const OVERSEAS_FX_WARN = 0.2;
const MACRO_EXPOSURE_WARN = 60; // 단일 매크로 섹터 60%+ 면 쏠림
const HIGH_CORR_THRESHOLD = 0.7; // 상관계수 0.7+ = 동조화 위험

// ── 위험 카드 ────────────────────────────────────────────

function buildRiskCard(
  c: Composition,
  recency: RecencyDatum[],
): AiReportCard {
  const details: string[] = [];
  let warned = false;

  if (c.topSector && c.topSector.ratio >= SINGLE_SECTOR_WARN) {
    warned = true;
    details.push(
      `${c.topSector.sector} 섹터 비중 ${pct(c.topSector.ratio)}% (권장: 25% 이하)`,
    );
  }
  if (c.topTicker && c.topTicker.ratio >= SINGLE_TICKER_WARN) {
    warned = true;
    details.push(
      `단일 종목(${c.topTicker.name}) 비중 ${pct(c.topTicker.ratio)}%로 집중 위험`,
    );
  }
  if (c.overseasRatio >= OVERSEAS_FX_WARN) {
    details.push(`해외 자산 비중 ${pct(c.overseasRatio)}%로 환율 리스크 존재`);
  }

  // 최신성 편향 방어: 단기 급등 + 고점/과매수 종목 경고
  const recencyAlerts = buildRecencyAlerts(recency);
  for (const a of recencyAlerts) {
    warned = true;
    details.push(a);
  }

  if (details.length === 0) {
    details.push('특정 섹터/종목 과집중은 발견되지 않았습니다');
  }

  return {
    id: 'risk',
    title: '포트폴리오 위험 분석',
    status: warned ? 'warning' : 'positive',
    summary: warned
      ? `${c.topSector?.sector ?? '특정'} 섹터 집중도가 높아 변동성 위험이 있습니다`
      : '집중 위험이 낮은 안정적인 구성입니다',
    details,
    recommendation: warned
      ? '특정 섹터/종목 비중을 낮추고 자산군을 분산해 집중 위험을 완화하세요.'
      : '',
  };
}

// 최신성 편향 방어 규칙 (요구사항 그대로 구현)
function buildRecencyAlerts(recency: RecencyDatum[]): string[] {
  const out: string[] = [];
  for (const r of recency) {
    const r1m = r.return1M ?? null;
    const r1y = r.return1Y ?? null;
    const rsi = r.rsi ?? null;
    const ath = r.distanceFromATH ?? null;

    // 단기 급등 + (1년 저조 OR 과매수)
    const shortSpike = r1m != null && r1m >= 20;
    const longWeak = r1y != null && r1y < 5;
    const overbought = rsi != null && rsi >= 70;
    if (shortSpike && (longWeak || overbought)) {
      out.push(
        `${r.stockName}(${r.ticker}): 1개월 +${r1m!.toFixed(1)}% 단기 급등` +
          `${overbought ? `, RSI ${Math.round(rsi!)}` : ''}` +
          `${longWeak ? `, 1년 수익률 ${r1y!.toFixed(1)}%` : ''}` +
          ' — 밸류에이션 피로감 및 추세 반전 리스크 고조',
      );
    }
    // 역사적 고점 근접
    if (ath != null && ath >= -3 && ath <= 1) {
      out.push(
        `${r.stockName}(${r.ticker}): 역사적 고점 부근 — 상방 제한 및 차익실현 매물 출회 가능성`,
      );
    }
  }
  return out;
}

// ── 거시 카드 (하드코딩 제거) ────────────────────────────
// 신선한 거시 데이터를 매일 공급할 수 없으므로, 신선도 데이터가 없으면 단정하지 않는다.

function buildMacroCard(hasMacroData: boolean): AiReportCard {
  if (!hasMacroData) {
    return {
      id: 'macro',
      title: '거시경제 영향 분석',
      status: 'neutral',
      summary: '실시간 거시 데이터 미연동 구간입니다',
      details: [
        '현재 최신 금리/환율 데이터가 실시간으로 연동되어 있지 않습니다',
        '실시간 거시 분석은 데이터 파이프라인 연동 후 제공됩니다',
        '아래 분석은 포트폴리오 구조(집중도·상관관계) 기준으로만 산출되었습니다',
      ],
      recommendation: '',
    };
  }
  // 신선한 거시 데이터가 실제로 주입되는 경우에만 이 분기로 확장하세요.
  return {
    id: 'macro',
    title: '거시경제 영향 분석',
    status: 'neutral',
    summary: '거시 환경 분석',
    details: ['최신 거시 데이터를 기반으로 분석되었습니다'],
    recommendation: '',
  };
}

// ── 변동성 카드 ──────────────────────────────────────────

function buildVolatilityCard(
  snapshot: AnalyzerSnapshot | null,
  c: Composition,
): AiReportCard {
  const details: string[] = [];
  let status: AiReportCard['status'] = 'neutral';

  if (snapshot && snapshot.riskScore != null) {
    const rs = snapshot.riskScore;
    if (rs >= 70) status = 'warning';
    else if (rs <= 40) status = 'positive';
    details.push(`AI 위험 점수 ${Math.round(rs)} / 100 기준 변동성 평가`);
    if (snapshot.dailyPnL != null) {
      details.push(
        `최근 일간 손익 ${snapshot.dailyPnL >= 0 ? '+' : ''}${snapshot.dailyPnL.toFixed(2)}%`,
      );
    }
  } else {
    status = 'neutral';
    details.push('변동성 산출에 필요한 분석 스냅샷이 아직 없습니다');
    details.push('포트폴리오 가격 이력이 축적되면 정밀 분석이 제공됩니다');
  }

  if (c.topSector && c.topSector.ratio >= SINGLE_SECTOR_WARN) {
    details.push(`${c.topSector.sector} 섹터 편중이 변동성을 키울 수 있어 관리 필요`);
  }
  // 채권 비중이 변동성 완충 역할
  if (c.bondRatio > 0) {
    details.push(`채권 비중 ${pct(c.bondRatio)}%가 변동성 완충 역할`);
  }

  return {
    id: 'volatility',
    title: '변동성 분석',
    status,
    summary:
      snapshot && snapshot.riskScore != null
        ? '포트폴리오 변동성 수준을 평가했습니다'
        : '변동성 분석을 위한 데이터가 부족합니다',
    details,
    recommendation:
      status === 'warning'
        ? '변동성 관리를 위해 저베타 종목이나 단기 채권 비중 확대를 검토해보세요.'
        : '',
  };
}

// ── 분산도 카드 (상관관계 반영) ──────────────────────────
// 핵심: 섹터 "개수"가 아니라 실질 동조화(상관계수, 매크로 노출)로 판단.
// 백엔드가 준 alerts/exposure는 가공하지 않고 그대로 인용.

function buildDiversificationCard(
  c: Composition,
  corr: CorrelationInput | null,
): AiReportCard {
  const details: string[] = [];
  let status: AiReportCard['status'] = 'positive';

  // 종목 수
  if (c.numEquityHoldings > 0) {
    const enough = c.numEquityHoldings >= 10 && c.numEquityHoldings <= 30;
    if (!enough) status = 'warning';
    details.push(
      `보유 주식 종목 ${c.numEquityHoldings}개${
        c.numEquityHoldings < 10 ? ' (권장: 10-15개)' : ''
      }`,
    );
  }

  let hadCorrSignal = false;

  if (corr) {
    // 1) 매크로 섹터 노출 쏠림 (가공 없이 인용)
    if (corr.macroSectorExposure) {
      const sorted = Object.entries(corr.macroSectorExposure).sort(
        (a, b) => b[1] - a[1],
      );
      const top = sorted[0];
      if (top && top[1] >= MACRO_EXPOSURE_WARN) {
        status = 'warning';
        hadCorrSignal = true;
        details.push(
          `매크로 섹터 노출: ${top[0]} ${top[1]}% — 표면적 종목 분산과 달리 실질적으로 ${top[0]} 한 곳에 쏠려 있습니다`,
        );
      }
    }

    // 2) 고상관 경고 (백엔드 문장 그대로 인용 — 숫자 가공 금지)
    if (corr.highCorrelationAlerts && corr.highCorrelationAlerts.length > 0) {
      hadCorrSignal = true;
      status = 'warning';
      for (const alert of corr.highCorrelationAlerts) {
        details.push(alert);
      }
    } else if (corr.correlationMatrix) {
      // alerts가 없으면 매트릭스에서 직접 고상관 쌍 추출 (값은 그대로 인용)
      const pairs = extractHighCorrPairs(corr.correlationMatrix);
      if (pairs.length > 0) {
        hadCorrSignal = true;
        status = 'warning';
        for (const p of pairs) {
          details.push(
            `${p.a}와(과) ${p.b}의 상관계수 ${p.r} — 동조화 위험(함께 하락할 수 있음)`,
          );
        }
      }
    }
  }

  // 상관 데이터가 전혀 없을 때만 섹터 개수 기반 보조 판단 (착각 방지 문구 포함)
  if (!corr) {
    if (c.topSector && c.topSector.ratio >= SINGLE_SECTOR_WARN) {
      status = 'warning';
      details.push(`${c.topSector.sector} 섹터 편중으로 섹터 분산 미흡`);
    }
    details.push(
      '상관관계 데이터 미연동: 종목 수가 많아도 실질 동조화 위험은 별도 평가가 필요합니다',
    );
  }

  // 지역 분산
  const domesticRatio = 1 - c.overseasRatio;
  if (c.equityRatio > 0 && domesticRatio >= 0.7) {
    status = status === 'positive' ? 'warning' : status;
    details.push(`국내 자산 ${pct(domesticRatio)}%로 지역 분산 필요`);
  }

  // 채권 만기 분산 (CD/3년/10년)
  if (c.bondRatio > 0 && c.bondBreakdown.length > 0) {
    const bondDesc = c.bondBreakdown
      .map((b) => `${bondLabel[b.type]} ${pct(b.ratio)}%`)
      .join(', ');
    details.push(`채권 구성: ${bondDesc}`);
    if (c.bondBreakdown.length === 1) {
      details.push('채권이 단일 만기에 집중되어 듀레이션(금리) 리스크 분산 필요');
    }
  }

  if (details.length === 0) {
    details.push('분산도 산출에 필요한 보유 자산 정보가 부족합니다');
    status = 'neutral';
  }

  return {
    id: 'diversification',
    title: '분산도 분석',
    status,
    summary:
      status === 'warning'
        ? hadCorrSignal
          ? '표면적 분산 뒤에 자산 동조화 위험이 숨어 있습니다'
          : '섹터 분산이 다소 부족합니다'
        : '비교적 균형 잡힌 분산 구성입니다',
    details,
    recommendation:
      status === 'warning'
        ? '상관관계가 낮은 비IT 섹터, 채권, 해외 자산을 추가해 실질 분산을 높이세요.'
        : '',
  };
}

function extractHighCorrPairs(
  matrix: Record<string, Record<string, number>>,
): Array<{ a: string; b: string; r: number }> {
  const out: Array<{ a: string; b: string; r: number }> = [];
  const tickers = Object.keys(matrix);
  for (let i = 0; i < tickers.length; i++) {
    for (let j = i + 1; j < tickers.length; j++) {
      const a = tickers[i];
      const b = tickers[j];
      const r = matrix[a]?.[b];
      if (typeof r === 'number' && r >= HIGH_CORR_THRESHOLD) {
        out.push({ a, b, r }); // 값 가공 안 함
      }
    }
  }
  return out.sort((x, y) => y.r - x.r).slice(0, 4);
}

// ── 종합 점수/등급 ───────────────────────────────────────

function computeGrades(
  c: Composition,
  snapshot: AnalyzerSnapshot | null,
  holdings: AnalyzerHolding[],
  corr: CorrelationInput | null,
  recency: RecencyDatum[],
): {
  totalScore: number;
  grades: AiReportResponse['summary']['grades'];
} {
  // 위험관리
  let riskMgmt = 90;
  if (c.topSector && c.topSector.ratio >= SINGLE_SECTOR_WARN)
    riskMgmt -= (c.topSector.ratio - SINGLE_SECTOR_WARN) * 100;
  if (c.topTicker && c.topTicker.ratio >= SINGLE_TICKER_WARN)
    riskMgmt -= (c.topTicker.ratio - SINGLE_TICKER_WARN) * 80;
  if (snapshot?.riskScore != null) riskMgmt -= snapshot.riskScore * 0.2;
  // 최신성 편향: 급등/고점 종목 있으면 위험관리 점수 추가 차감
  riskMgmt -= buildRecencyAlerts(recency).length * 4;
  riskMgmt = clamp(riskMgmt, 35, 98);

  // 수익성
  const valued = holdings.filter((h) => h.per != null);
  let profitability = 84;
  if (valued.length > 0) {
    const avgPer =
      valued.reduce((s, h) => s + (h.per as number), 0) / valued.length;
    if (avgPer > 0 && avgPer < 15) profitability += 4;
    if (avgPer > 35) profitability -= 8; // 고PER 페널티 강화
  }
  if (snapshot?.dailyPnL != null)
    profitability += clamp(snapshot.dailyPnL, -5, 5);
  profitability = clamp(profitability, 40, 94);

  // 분산도: 상관/매크로 노출 반영 (개수만으로 가점 안 줌)
  let diversification = 88;
  if (c.numEquityHoldings > 0 && c.numEquityHoldings < 10)
    diversification -= (10 - c.numEquityHoldings) * 3;
  if (corr?.macroSectorExposure) {
    const topExp = Math.max(0, ...Object.values(corr.macroSectorExposure));
    if (topExp >= MACRO_EXPOSURE_WARN) diversification -= (topExp - 50) * 0.6;
  } else if (c.topSector && c.topSector.ratio >= SINGLE_SECTOR_WARN) {
    diversification -= (c.topSector.ratio - SINGLE_SECTOR_WARN) * 90;
  }
  const corrPenaltyCount =
    (corr?.highCorrelationAlerts?.length ?? 0) ||
    (corr?.correlationMatrix
      ? extractHighCorrPairs(corr.correlationMatrix).length
      : 0);
  diversification -= corrPenaltyCount * 4;
  if (c.equityRatio > 0 && 1 - c.overseasRatio >= 0.7) diversification -= 6;
  if (c.bondRatio > 0) diversification += 3; // 채권 보유는 자산군 분산 가점
  diversification = clamp(diversification, 35, 94);

  // 유동성
  const liquidity = clamp(
    72 +
      (c.numHoldings >= 5 ? 6 : 0) +
      (c.overseasRatio > 0 && c.overseasRatio < 0.4 ? 4 : 0) +
      (c.bondRatio > 0 ? 3 : 0),
    50,
    92,
  );

  const totalScore = Math.round(
    riskMgmt * 0.32 +
      profitability * 0.26 +
      diversification * 0.27 +
      liquidity * 0.15,
  );

  return {
    totalScore,
    grades: {
      riskManagement: scoreToGrade(riskMgmt),
      profitability: scoreToGrade(profitability),
      diversification: scoreToGrade(diversification),
      liquidity: scoreToGrade(liquidity),
    },
  };
}

// ── 상품 추천 ────────────────────────────────────────────

function buildProductRecommendations(
  c: Composition,
  profile: AnalyzerProfile,
  corr: CorrelationInput | null,
): AiReportProductRecommendation[] {
  const recs: AiReportProductRecommendation[] = [];
  const riskType = profile.riskType ?? '';

  // 채권이 단일 만기에 쏠렸으면 만기 분산 카테고리
  if (c.bondRatio > 0 && c.bondBreakdown.length === 1) {
    recs.push({
      category: '만기 분산 채권 ETF',
      description: '단일 만기 집중 완화, 듀레이션 리스크 분산',
      examples: ['단기 채권 ETF', '중장기 국고채 ETF'],
      risk: 'low',
      suitability: '금리 리스크 분산',
    });
  }

  // 실질 동조화(상관/매크로 노출) 높으면 비상관 자산
  const macroConcentrated =
    corr?.macroSectorExposure &&
    Math.max(0, ...Object.values(corr.macroSectorExposure)) >= MACRO_EXPOSURE_WARN;
  const concentrated =
    macroConcentrated ||
    (c.topSector?.ratio ?? 0) >= SINGLE_SECTOR_WARN ||
    (c.topTicker?.ratio ?? 0) >= SINGLE_TICKER_WARN;

  if (concentrated) {
    recs.push({
      category: '배당주/배당 ETF',
      description: '변동성 대비와 인컴 수익 확보',
      examples: ['KODEX 고배당', 'TIGER 배당성장'],
      risk: 'medium',
      suitability: '인컴과 성장의 균형',
    });
  }

  if (c.numEquityHoldings < 10 || c.numSectors < 4) {
    recs.push({
      category: '인덱스 ETF',
      description: '시장 전체에 분산 투자하여 리스크 관리',
      examples: ['KODEX 200', 'TIGER 미국S&P500'],
      risk: 'medium',
      suitability: '장기 자산 증식',
    });
  }

  if (
    riskType.includes('공격') ||
    riskType.toLowerCase().includes('aggressive')
  ) {
    recs.push({
      category: '성장주 카테고리',
      description: 'AI, 2차전지 등 미래 성장 산업',
      examples: ['반도체, AI 관련주', '2차전지 관련주'],
      risk: 'high',
      suitability: '공격적 수익 추구',
    });
  }

  if (recs.length === 0) {
    recs.push({
      category: '인덱스 ETF',
      description: '시장 전체에 분산 투자하여 리스크 관리',
      examples: ['KODEX 200', 'TIGER 미국S&P500'],
      risk: 'medium',
      suitability: '장기 자산 증식',
    });
  }

  return recs;
}

// ── 메인 ─────────────────────────────────────────────────

export function analyzePortfolio(input: AnalyzerInput): AiReportResponse {
  const { holdings, snapshot, correlation, recency, profile, dataQuality } =
    input;

  if (!dataQuality.hasPortfolio || holdings.length === 0) {
    return insufficient(
      dataQuality,
      '리포트를 생성할 포트폴리오 데이터가 부족합니다',
      '보유 종목 정보가 없어 분석을 진행할 수 없습니다. 온보딩에서 포트폴리오를 등록해 주세요.',
      [],
    );
  }

  const c = buildComposition(holdings);

  if (c.totalValue <= 0) {
    return insufficient(
      dataQuality,
      '평가액 계산에 필요한 가격 정보가 부족합니다',
      '시장가 또는 투자금액이 없어 종합 점수를 산출할 수 없습니다. 가격 데이터가 채워지면 자동으로 갱신됩니다.',
      [buildDiversificationCard(c, correlation)],
    );
  }

  const { totalScore, grades } = computeGrades(
    c,
    snapshot,
    holdings,
    correlation,
    recency,
  );

  const cards: AiReportCard[] = [
    buildRiskCard(c, recency),
    buildMacroCard(dataQuality.hasMacroData),
    buildVolatilityCard(snapshot, c),
    buildDiversificationCard(c, correlation),
  ];

  return {
    status: 'ready',
    generatedAt: new Date().toISOString(),
    summary: {
      totalScore,
      headline: `포트폴리오 종합 점수: ${totalScore}점`,
      description: buildSummaryDescription(c, totalScore, correlation, recency),
      grades,
    },
    cards,
    productRecommendations: buildProductRecommendations(c, profile, correlation),
    dataQuality,
    disclaimer: AI_REPORT_DISCLAIMER,
  };
}

function insufficient(
  dataQuality: AnalyzerInput['dataQuality'],
  headline: string,
  description: string,
  cards: AiReportCard[],
): AiReportResponse {
  return {
    status: 'insufficient_data',
    generatedAt: cards.length ? new Date().toISOString() : null,
    summary: {
      totalScore: null,
      headline,
      description,
      grades: {
        riskManagement: null,
        profitability: null,
        diversification: null,
        liquidity: null,
      },
    },
    cards,
    productRecommendations: [],
    dataQuality,
    disclaimer: AI_REPORT_DISCLAIMER,
  };
}

// 종합 설명 — 무조건적 낙관 금지(CRO 톤). 약점이 있으면 먼저 지적.
function buildSummaryDescription(
  c: Composition,
  totalScore: number,
  corr: CorrelationInput | null,
  recency: RecencyDatum[],
): string {
  const parts: string[] = [];

  const macroConcentrated =
    corr?.macroSectorExposure &&
    Math.max(0, ...Object.values(corr.macroSectorExposure)) >= MACRO_EXPOSURE_WARN;
  const hasCorrAlert = (corr?.highCorrelationAlerts?.length ?? 0) > 0;
  const hasRecencyRisk = buildRecencyAlerts(recency).length > 0;

  if (totalScore >= 80) parts.push('정량 지표는 전반적으로 양호합니다.');
  else if (totalScore >= 70)
    parts.push('전반적으로 양호하나 구조적 개선이 필요합니다.');
  else parts.push('포트폴리오 구조에 개선이 시급합니다.');

  if (macroConcentrated || hasCorrAlert) {
    parts.push(
      '표면적인 종목 수와 무관하게, 보유 자산 간 동조화(상관) 위험이 높아 실질 분산은 부족합니다.',
    );
  }
  if (hasRecencyRisk) {
    parts.push(
      '일부 종목은 단기 급등·고점 부근으로 추세 반전 리스크가 고조된 상태입니다.',
    );
  }
  if (!macroConcentrated && !hasCorrAlert && !hasRecencyRisk) {
    parts.push('구조적 집중·동조화 위험은 현재 두드러지지 않습니다.');
  }
  return parts.join(' ');
}
