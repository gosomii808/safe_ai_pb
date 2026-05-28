-- CreateTable
CREATE TABLE "daily_market_macro_prices" (
    "date" DATETIME NOT NULL PRIMARY KEY,
    "kospi_index" REAL,
    "sp500_index" REAL,
    "nasdaq_index" REAL,
    "usd_krw" REAL,
    "kr_bond_3y" REAL,
    "us_bond_10y" REAL,
    "kr_base_rate" REAL,
    "us_base_rate" REAL,
    "spy_etf_close" REAL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "event_market_reactions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "economic_event_id" TEXT NOT NULL,
    "kospi_t_minus_5" REAL,
    "kospi_t_minus_4" REAL,
    "kospi_t_minus_3" REAL,
    "kospi_t_minus_2" REAL,
    "kospi_t_minus_1" REAL,
    "kospi_t_0" REAL,
    "kospi_t_plus_1" REAL,
    "kospi_t_plus_2" REAL,
    "kospi_t_plus_3" REAL,
    "kospi_t_plus_4" REAL,
    "kospi_t_plus_5" REAL,
    "kospi_return_d1_pct" REAL,
    "kospi_return_d5_pct" REAL,
    "usd_krw_return_d1_pct" REAL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "event_market_reactions_economic_event_id_fkey" FOREIGN KEY ("economic_event_id") REFERENCES "EconomicEvent" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sector_event_sensitivity" (
    "sector" TEXT NOT NULL,
    "event_column" TEXT NOT NULL,
    "avg_abs_pct" REAL,
    "event_count" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("sector", "event_column")
);

-- CreateIndex
CREATE UNIQUE INDEX "event_market_reactions_economic_event_id_key" ON "event_market_reactions"("economic_event_id");
