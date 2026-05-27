export const eventSeeds = [
  {
    eventDate: '2026-05-20T00:00:00.000Z',
    title: 'FOMC 금리 결정',
    category: 'INTEREST_RATE',
    country: 'US',
    importance: 'HIGH',
    description: '연준 기준금리와 점도표 발표. 기자회견 톤이 단기 위험자산 변동성에 영향을 줄 수 있습니다.',
    affectedAssets: 'stocks,etf,bonds,fx,tech',
    source: 'Federal Reserve',
  },
  {
    eventDate: '2026-05-22T00:00:00.000Z',
    title: '미국 CPI 발표',
    category: 'INFLATION',
    country: 'US',
    importance: 'HIGH',
    description: '소비자물가 추세 확인 이벤트로 금리 기대 경로의 재조정 가능성이 있습니다.',
    affectedAssets: 'stocks,bonds,fx,etf',
    source: 'BLS',
  },
  {
    eventDate: '2026-05-24T00:00:00.000Z',
    title: '한국은행 금융통화위원회',
    category: 'POLICY',
    country: 'KR',
    importance: 'MEDIUM',
    description: '정책금리와 통화정책 방향성 코멘트가 원화 및 국내 성장주 심리에 영향을 줄 수 있습니다.',
    affectedAssets: 'stocks,fx,bonds',
    source: 'BOK',
  },
];

export const ruleSeeds = [
  {
    eventCategory: 'INTEREST_RATE',
    condition: 'hawkish_or_rate_hike',
    affectedAsset: 'tech',
    expectedImpact: 'downside_pressure',
    explanation: '할인율 상승 구간에서는 성장주 밸류에이션 부담이 커질 수 있습니다.',
    riskLevel: 'MEDIUM',
  },
  {
    eventCategory: 'INFLATION',
    condition: 'higher_than_expected',
    affectedAsset: 'bonds',
    expectedImpact: 'price_weakness',
    explanation: '물가 상방은 장기채 금리 상승 압력으로 채권 가격의 단기 약세 가능성을 높입니다.',
    riskLevel: 'MEDIUM',
  },
  {
    eventCategory: 'POLICY',
    condition: 'easing_signal',
    affectedAsset: 'stocks',
    expectedImpact: 'supportive_sentiment',
    explanation: '완화적 정책 신호는 위험자산 선호를 개선할 수 있습니다.',
    riskLevel: 'LOW',
  },
];
