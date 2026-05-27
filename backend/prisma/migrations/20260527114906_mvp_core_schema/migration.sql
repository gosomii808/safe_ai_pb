-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "ageRange" TEXT,
    "occupation" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "InvestmentProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "riskType" TEXT NOT NULL,
    "investmentGoal" TEXT NOT NULL,
    "investmentExperience" TEXT,
    "preferredAssets" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "InvestmentProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PortfolioAsset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "market" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "stockName" TEXT,
    "sector" TEXT,
    "quantity" TEXT NOT NULL,
    "avgBuyPrice" TEXT,
    "investmentAmount" TEXT,
    "targetRatio" REAL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "PortfolioAsset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "PortfolioAnalysisSnapshot" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "snapshotDate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "totalValue" REAL NOT NULL,
    "dailyPnL" REAL,
    "riskScore" REAL,
    "diversification" REAL,
    "summary" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PortfolioAnalysisSnapshot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "MarketPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "market" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "currency" TEXT NOT NULL,
    "priceDate" DATETIME NOT NULL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "MarketIndex" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "indexCode" TEXT NOT NULL,
    "indexName" TEXT NOT NULL,
    "value" REAL NOT NULL,
    "change" REAL,
    "changeRate" REAL,
    "indexDate" DATETIME NOT NULL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ValuationIndicator" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "market" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "per" REAL,
    "pbr" REAL,
    "eps" REAL,
    "bps" REAL,
    "indicatorDate" DATETIME NOT NULL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "ForeignOwnership" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "market" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "ownershipRatio" REAL NOT NULL,
    "netBuyAmount" REAL,
    "ownershipDate" DATETIME NOT NULL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "YahooPrice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "symbol" TEXT NOT NULL,
    "open" REAL,
    "high" REAL,
    "low" REAL,
    "close" REAL NOT NULL,
    "adjClose" REAL,
    "volume" REAL,
    "priceDate" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "EconomicEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "eventDate" DATETIME NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "importance" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "affectedAssets" TEXT NOT NULL,
    "source" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "EventImpactRule" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "economicEventId" TEXT NOT NULL,
    "eventCategory" TEXT NOT NULL,
    "condition" TEXT NOT NULL,
    "affectedAsset" TEXT NOT NULL,
    "expectedImpact" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "riskLevel" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "EventImpactRule_economicEventId_fkey" FOREIGN KEY ("economicEventId") REFERENCES "EconomicEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AccessLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "action" TEXT NOT NULL,
    "endpoint" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AccessLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "AiRequestLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "requestType" TEXT NOT NULL,
    "modelName" TEXT,
    "promptHash" TEXT,
    "tokenUsage" INTEGER,
    "latencyMs" INTEGER,
    "success" BOOLEAN NOT NULL DEFAULT true,
    "errorCode" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AiRequestLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SecurityEvent" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "eventType" TEXT NOT NULL,
    "severity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "metadata" TEXT,
    "ipAddress" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "SecurityEvent_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "InvestmentProfile_userId_key" ON "InvestmentProfile"("userId");

-- CreateIndex
CREATE INDEX "PortfolioAsset_ticker_idx" ON "PortfolioAsset"("ticker");

-- CreateIndex
CREATE UNIQUE INDEX "PortfolioAsset_userId_market_ticker_key" ON "PortfolioAsset"("userId", "market", "ticker");

-- CreateIndex
CREATE INDEX "PortfolioAnalysisSnapshot_userId_snapshotDate_idx" ON "PortfolioAnalysisSnapshot"("userId", "snapshotDate");

-- CreateIndex
CREATE INDEX "MarketPrice_ticker_priceDate_idx" ON "MarketPrice"("ticker", "priceDate");

-- CreateIndex
CREATE UNIQUE INDEX "MarketPrice_market_ticker_priceDate_key" ON "MarketPrice"("market", "ticker", "priceDate");

-- CreateIndex
CREATE INDEX "MarketIndex_indexDate_idx" ON "MarketIndex"("indexDate");

-- CreateIndex
CREATE UNIQUE INDEX "MarketIndex_indexCode_indexDate_key" ON "MarketIndex"("indexCode", "indexDate");

-- CreateIndex
CREATE UNIQUE INDEX "ValuationIndicator_market_ticker_indicatorDate_key" ON "ValuationIndicator"("market", "ticker", "indicatorDate");

-- CreateIndex
CREATE UNIQUE INDEX "ForeignOwnership_market_ticker_ownershipDate_key" ON "ForeignOwnership"("market", "ticker", "ownershipDate");

-- CreateIndex
CREATE INDEX "YahooPrice_symbol_priceDate_idx" ON "YahooPrice"("symbol", "priceDate");

-- CreateIndex
CREATE UNIQUE INDEX "YahooPrice_symbol_priceDate_key" ON "YahooPrice"("symbol", "priceDate");

-- CreateIndex
CREATE INDEX "EconomicEvent_eventDate_idx" ON "EconomicEvent"("eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "EconomicEvent_eventDate_title_country_key" ON "EconomicEvent"("eventDate", "title", "country");

-- CreateIndex
CREATE INDEX "EventImpactRule_eventCategory_idx" ON "EventImpactRule"("eventCategory");

-- CreateIndex
CREATE UNIQUE INDEX "EventImpactRule_economicEventId_condition_affectedAsset_key" ON "EventImpactRule"("economicEventId", "condition", "affectedAsset");

-- CreateIndex
CREATE INDEX "AccessLog_userId_createdAt_idx" ON "AccessLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AiRequestLog_userId_createdAt_idx" ON "AiRequestLog"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AiRequestLog_requestType_createdAt_idx" ON "AiRequestLog"("requestType", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_severity_createdAt_idx" ON "SecurityEvent"("severity", "createdAt");

-- CreateIndex
CREATE INDEX "SecurityEvent_userId_createdAt_idx" ON "SecurityEvent"("userId", "createdAt");
