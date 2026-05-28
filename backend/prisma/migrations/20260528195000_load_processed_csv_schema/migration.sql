-- Extend existing market tables with processed CSV fields.
ALTER TABLE "MarketPrice" ADD COLUMN "stockName" TEXT;
ALTER TABLE "MarketPrice" ADD COLUMN "openPrice" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "highPrice" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "lowPrice" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "volume" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "tradingValue" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "marketCap" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "change" REAL;
ALTER TABLE "MarketPrice" ADD COLUMN "changeRate" REAL;

ALTER TABLE "MarketIndex" ADD COLUMN "indexClass" TEXT;
ALTER TABLE "MarketIndex" ADD COLUMN "market" TEXT;
ALTER TABLE "MarketIndex" ADD COLUMN "openValue" REAL;
ALTER TABLE "MarketIndex" ADD COLUMN "highValue" REAL;
ALTER TABLE "MarketIndex" ADD COLUMN "lowValue" REAL;
ALTER TABLE "MarketIndex" ADD COLUMN "volume" REAL;
ALTER TABLE "MarketIndex" ADD COLUMN "tradingValue" REAL;
ALTER TABLE "MarketIndex" ADD COLUMN "marketCap" REAL;

ALTER TABLE "ValuationIndicator" ADD COLUMN "indexName" TEXT;
ALTER TABLE "ValuationIndicator" ADD COLUMN "dividendYield" REAL;

ALTER TABLE "ForeignOwnership" ADD COLUMN "stockName" TEXT;
ALTER TABLE "ForeignOwnership" ADD COLUMN "listedShares" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "foreignHoldingShares" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "foreignLimitShares" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "foreignLimitExhaustionRatio" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "closePrice" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "change" REAL;
ALTER TABLE "ForeignOwnership" ADD COLUMN "changeRate" REAL;

ALTER TABLE "YahooPrice" ADD COLUMN "assetType" TEXT;
ALTER TABLE "YahooPrice" ADD COLUMN "currency" TEXT;
ALTER TABLE "YahooPrice" ADD COLUMN "source" TEXT;

ALTER TABLE "EconomicEvent" ADD COLUMN "releaseDate" DATETIME;
ALTER TABLE "EconomicEvent" ADD COLUMN "releaseTime" TEXT;
ALTER TABLE "EconomicEvent" ADD COLUMN "targetPeriod" TEXT;
ALTER TABLE "EconomicEvent" ADD COLUMN "eventType" TEXT;
ALTER TABLE "EconomicEvent" ADD COLUMN "actualValue" REAL;
ALTER TABLE "EconomicEvent" ADD COLUMN "forecastValue" REAL;
ALTER TABLE "EconomicEvent" ADD COLUMN "previousValue" REAL;
ALTER TABLE "EconomicEvent" ADD COLUMN "decisionType" TEXT;
ALTER TABLE "EconomicEvent" ADD COLUMN "changeBp" REAL;
ALTER TABLE "EconomicEvent" ADD COLUMN "surpriseBp" REAL;

-- Add processed CSV tables that were not present in the MVP schema.
CREATE TABLE "FxRate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "currencyPair" TEXT NOT NULL,
    "exchangeRate" REAL NOT NULL,
    "openPrice" REAL,
    "highPrice" REAL,
    "lowPrice" REAL,
    "closePrice" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "InterestRate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "country" TEXT NOT NULL,
    "rateType" TEXT NOT NULL,
    "rateName" TEXT NOT NULL,
    "rateValue" REAL,
    "releaseDate" DATETIME,
    "effectiveDate" DATETIME,
    "decisionType" TEXT,
    "previousRate" REAL,
    "changeBp" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "InvestorFlow" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "ticker" TEXT,
    "stockName" TEXT,
    "investorType" TEXT NOT NULL,
    "netBuyAmount" REAL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX "FxRate_currencyPair_date_key" ON "FxRate"("currencyPair", "date");
CREATE INDEX "FxRate_date_idx" ON "FxRate"("date");

CREATE UNIQUE INDEX "InterestRate_date_country_rateType_rateName_source_key" ON "InterestRate"("date", "country", "rateType", "rateName", "source");
CREATE INDEX "InterestRate_country_rateType_date_idx" ON "InterestRate"("country", "rateType", "date");

CREATE UNIQUE INDEX "InvestorFlow_date_ticker_stockName_investorType_key" ON "InvestorFlow"("date", "ticker", "stockName", "investorType");
CREATE INDEX "InvestorFlow_date_idx" ON "InvestorFlow"("date");
