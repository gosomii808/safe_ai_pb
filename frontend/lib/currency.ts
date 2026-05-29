export function getCurrencyByMarket(market: string): "KRW" | "USD" {
  const m = market.toUpperCase();
  if (
    m === "KOSPI" ||
    m === "KOSDAQ" ||
    m === "KRX" ||
    m === "국내주식" ||
    m === "국내"
  ) {
    return "KRW";
  }
  return "USD";
}
