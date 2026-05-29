import { INestApplication, Injectable, OnModuleDestroy } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';

type SqlValue = string | number | boolean | null | Date | undefined;
type Row = Record<string, any>;

@Injectable()
export class PrismaService implements OnModuleDestroy {
  private db: DatabaseSync;

  constructor() {
    this.db = new DatabaseSync(this.resolveDatabasePath());
    this.db.exec('PRAGMA foreign_keys = ON');
    this.db.exec('PRAGMA journal_mode = WAL');
    this.db.exec('PRAGMA busy_timeout = 5000');
    this.ensureUserAuthColumns();
  }

  async onModuleInit() {
    return undefined;
  }

  async onModuleDestroy() {
    this.db.close();
  }

  async enableShutdownHooks(app: INestApplication) {
    process.once('beforeExit', async () => {
      await app.close();
    });
  }

  async $connect() {
    return undefined;
  }

  async $disconnect() {
    this.db.close();
  }

  async $transaction<T>(callback: (tx: this) => Promise<T>): Promise<T> {
    this.db.exec('BEGIN');
    try {
      const result = await callback(this);
      this.db.exec('COMMIT');
      return result;
    } catch (error) {
      this.db.exec('ROLLBACK');
      throw error;
    }
  }

  async $queryRaw<T = Row[]>(
    strings: TemplateStringsArray,
    ...values: SqlValue[]
  ): Promise<T> {
    const sql = strings.reduce((acc, part, index) => {
      return acc + part + (index < values.length ? '?' : '');
    }, '');
    return this.all(sql, values) as T;
  }

  user: any = {
    create: async ({ data, select }: { data: Row; select?: Row }) => {
      const id = randomUUID();
      const now = this.now();
      this.run(
        `INSERT INTO "User" (
          id, nickname, email, emailHash, passwordHash, phone, ageRange,
          occupation, createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          data.nickname,
          data.email,
          data.emailHash ?? null,
          data.passwordHash ?? null,
          data.phone,
          data.ageRange ?? null,
          data.occupation ?? null,
          now,
          now,
        ],
      );

      if (data.investmentProfile?.create) {
        const profile = data.investmentProfile.create;
        this.run(
          `INSERT INTO "InvestmentProfile" (
            id, userId, riskType, investmentGoal, investmentExperience, preferredAssets, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            randomUUID(),
            id,
            profile.riskType,
            profile.investmentGoal,
            profile.investmentExperience ?? null,
            profile.preferredAssets ?? null,
            now,
            now,
          ],
        );
      }

      for (const asset of data.portfolioAssets?.create ?? []) {
        this.run(
          `INSERT INTO "PortfolioAsset" (
            id, userId, market, ticker, stockName, sector, quantity, avgBuyPrice,
            investmentAmount, targetRatio, createdAt, updatedAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            randomUUID(),
            id,
            asset.market,
            asset.ticker,
            asset.stockName ?? null,
            asset.sector ?? null,
            asset.quantity,
            asset.avgBuyPrice ?? null,
            asset.investmentAmount ?? null,
            asset.targetRatio ?? null,
            now,
            now,
          ],
        );
      }

      return select?.id ? { id } : { id };
    },
    findUnique: async ({ where, include }: Row) => {
      const user = this.get(`SELECT * FROM "User" WHERE id = ? LIMIT 1`, [
        where.id,
      ]);
      if (!user) return null;

      return {
        ...user,
        investmentProfile: include?.investmentProfile
          ? this.get(
              `SELECT * FROM "InvestmentProfile" WHERE userId = ? LIMIT 1`,
              [where.id],
            )
          : undefined,
        portfolioAssets: include?.portfolioAssets
          ? this.all(
              `SELECT * FROM "PortfolioAsset" WHERE userId = ? ORDER BY market ASC, ticker ASC`,
              [where.id],
            )
          : undefined,
        analysisSnapshots: include?.analysisSnapshots
          ? this.all(
              `SELECT * FROM "PortfolioAnalysisSnapshot" WHERE userId = ? ORDER BY snapshotDate DESC`,
              [where.id],
            )
          : undefined,
      };
    },
  };

  accessLog: any = {
    create: async ({ data }: { data: Row }) => {
      const row = {
        id: randomUUID(),
        userId: data.userId ?? null,
        action: data.action,
        endpoint: data.endpoint,
        method: data.method,
        ipAddress: data.ipAddress ?? null,
        userAgent: data.userAgent ?? null,
        success: data.success ?? true,
        createdAt: this.now(),
      };
      this.run(
        `INSERT INTO "AccessLog" (
          id, userId, action, endpoint, method, ipAddress, userAgent, success, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(row),
      );
      return row;
    },
  };

  aiRequestLog: any = {
    create: async ({ data }: { data: Row }) => {
      const row = {
        id: randomUUID(),
        userId: data.userId ?? null,
        requestType: data.requestType,
        modelName: data.modelName ?? null,
        promptHash: data.promptHash ?? null,
        tokenUsage: data.tokenUsage ?? null,
        latencyMs: data.latencyMs ?? null,
        success: data.success ?? true,
        errorCode: data.errorCode ?? null,
        createdAt: this.toDbDateTime(data.createdAt) ?? this.now(),
      };
      this.run(
        `INSERT INTO "AiRequestLog" (
          id, userId, requestType, modelName, promptHash, tokenUsage,
          latencyMs, success, errorCode, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(row),
      );
      return row;
    },
  };

  portfolioAsset: any = {
    findMany: async ({ where }: { where: Row; orderBy?: Row }) => {
      return this.all(
        `SELECT * FROM "PortfolioAsset" WHERE userId = ? ORDER BY market ASC, ticker ASC`,
        [where.userId],
      );
    },
  };

  portfolioAnalysisSnapshot: any = {
    create: async ({ data }: { data: Row }) => {
      const row = {
        id: randomUUID(),
        userId: data.userId,
        snapshotDate: this.toDbDate(data.snapshotDate) ?? this.now(),
        totalValue: data.totalValue,
        dailyPnL: data.dailyPnL ?? null,
        riskScore: data.riskScore ?? null,
        diversification: data.diversification ?? null,
        summary: data.summary ?? null,
        createdAt: this.now(),
      };
      this.run(
        `INSERT INTO "PortfolioAnalysisSnapshot" (
          id, userId, snapshotDate, totalValue, dailyPnL, riskScore, diversification, summary, createdAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(row),
      );
      return row;
    },
    findFirst: async ({ where, orderBy }: Row = {}) => {
      const clauses: string[] = [];
      const params: SqlValue[] = [];
      if (where?.userId) {
        clauses.push('userId = ?');
        params.push(where.userId);
      }
      return this.get(
        [
          'SELECT * FROM "PortfolioAnalysisSnapshot"',
          clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
          `ORDER BY snapshotDate ${
            orderBy?.snapshotDate === 'asc' ? 'ASC' : 'DESC'
          }`,
          'LIMIT 1',
        ]
          .filter(Boolean)
          .join(' '),
        params,
      );
    },
  };

  marketPrice: any = {
    findFirst: async ({ where, orderBy }: Row = {}) => {
      const { sql, params } = this.buildMarketPriceQuery(where, orderBy, 1);
      return this.get(sql, params);
    },
    findMany: async ({ where, orderBy, take }: Row = {}) => {
      const { sql, params } = this.buildMarketPriceQuery(
        where,
        orderBy,
        take,
      );
      return this.all(sql, params);
    },
  };

  valuationIndicator: any = {
    findFirst: async ({ where, orderBy }: Row = {}) => {
      const clauses: string[] = [];
      const params: SqlValue[] = [];
      if (where?.market) {
        clauses.push('market = ?');
        params.push(where.market);
      }
      if (where?.ticker) {
        clauses.push('ticker = ?');
        params.push(where.ticker);
      }
      return this.get(
        [
          'SELECT * FROM "ValuationIndicator"',
          clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
          `ORDER BY indicatorDate ${
            orderBy?.indicatorDate === 'asc' ? 'ASC' : 'DESC'
          }`,
          'LIMIT 1',
        ]
          .filter(Boolean)
          .join(' '),
        params,
      );
    },
  };

  economicEvent: any = {
    deleteMany: async () => {
      const changes = this.run(`DELETE FROM "EconomicEvent"`).changes;
      return { count: changes };
    },
    create: async ({ data }: { data: Row }) => {
      const now = this.now();
      const row = {
        id: randomUUID(),
        eventDate: this.toDbDate(data.eventDate) ?? this.now(),
        releaseDate: this.toDbDate(data.releaseDate),
        releaseTime: data.releaseTime ?? null,
        targetPeriod: data.targetPeriod ?? null,
        eventType: data.eventType ?? null,
        title: data.title,
        category: data.category,
        country: data.country,
        importance: data.importance,
        actualValue: data.actualValue ?? null,
        forecastValue: data.forecastValue ?? null,
        previousValue: data.previousValue ?? null,
        decisionType: data.decisionType ?? null,
        changeBp: data.changeBp ?? null,
        surpriseBp: data.surpriseBp ?? null,
        description: data.description,
        affectedAssets: data.affectedAssets,
        source: data.source ?? null,
        createdAt: now,
        updatedAt: now,
      };
      this.run(
        `INSERT INTO "EconomicEvent" (
          id, eventDate, releaseDate, releaseTime, targetPeriod, eventType, title,
          category, country, importance, actualValue, forecastValue, previousValue,
          decisionType, changeBp, surpriseBp, description, affectedAssets, source,
          createdAt, updatedAt
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        Object.values(row),
      );
      return row;
    },
    findMany: async ({ where, include, orderBy, take }: Row = {}) => {
      const clauses: string[] = [];
      const params: SqlValue[] = [];
      if (where?.eventDate?.gte) {
        clauses.push('eventDate >= ?');
        params.push(this.toDbDate(where.eventDate.gte));
      }
      if (where?.eventDate?.lte) {
        clauses.push('eventDate <= ?');
        params.push(this.toDbDate(where.eventDate.lte));
      }
      if (where?.category) {
        clauses.push('category = ?');
        params.push(where.category);
      }
      if (where?.importance) {
        clauses.push('importance = ?');
        params.push(String(where.importance).toUpperCase());
      }
      const sql = [
        'SELECT * FROM "EconomicEvent"',
        clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
        `ORDER BY eventDate ${orderBy?.eventDate === 'desc' ? 'DESC' : 'ASC'}`,
        take ? 'LIMIT ?' : '',
      ]
        .filter(Boolean)
        .join(' ');
      if (take) params.push(take);
      const events = this.all(sql, params);
      if (include?.marketReaction) {
        return events.map((event) => ({
          ...event,
          marketReaction: this.getMarketReaction(event.id),
        }));
      }
      return events;
    },
    findUnique: async ({ where, include }: Row) => {
      const event = this.get(
        `SELECT * FROM "EconomicEvent" WHERE id = ? LIMIT 1`,
        [where.id],
      );
      if (!event) return null;
      return {
        ...event,
        impactRules: include?.impactRules
          ? this.all(`SELECT * FROM "EventImpactRule" WHERE economicEventId = ?`, [
              event.id,
            ])
          : undefined,
        marketReaction: include?.marketReaction
          ? this.getMarketReaction(event.id)
          : undefined,
      };
    },
  };

  eventImpactRule: any = {
    deleteMany: async () => {
      const changes = this.run(`DELETE FROM "EventImpactRule"`).changes;
      return { count: changes };
    },
    createMany: async ({ data }: { data: Row[] }) => {
      const now = this.now();
      for (const rule of data) {
        this.run(
          `INSERT INTO "EventImpactRule" (
            id, economicEventId, eventCategory, condition, affectedAsset,
            expectedImpact, explanation, riskLevel, createdAt
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            randomUUID(),
            rule.economicEventId,
            rule.eventCategory,
            rule.condition,
            rule.affectedAsset,
            rule.expectedImpact,
            rule.explanation,
            rule.riskLevel,
            now,
          ],
        );
      }
      return { count: data.length };
    },
    findMany: async () => {
      return this.all(`SELECT * FROM "EventImpactRule"`);
    },
  };

  dailyMarketMacroPrice: any = {
    findMany: async ({ orderBy, take }: Row = {}) => {
      const rows = this.all(
        `SELECT
          date, kospi_index as kospiIndex, sp500_index as sp500Index,
          nasdaq_index as nasdaqIndex, usd_krw as usdKrw, kr_bond_3y as krBond3y,
          us_bond_10y as usBond10y, kr_base_rate as krBaseRate,
          us_base_rate as usBaseRate, spy_etf_close as spyEtfClose,
          updated_at as updatedAt
        FROM daily_market_macro_prices
        ORDER BY date ${orderBy?.date === 'desc' ? 'DESC' : 'ASC'}
        LIMIT ?`,
        [take ?? 120],
      );
      return rows;
    },
  };

  sectorEventSensitivity: any = {
    findMany: async (_args?: Row) => {
      return this.all(
        `SELECT
          sector, event_column as eventColumn, avg_abs_pct as avgAbsPct,
          event_count as eventCount, score, updated_at as updatedAt
        FROM sector_event_sensitivity
        ORDER BY sector ASC, event_column ASC`,
      );
    },
  };

  private resolveDatabasePath(): string {
    const rawUrl = process.env.DATABASE_URL ?? 'file:./dev.db';
    const filePath = rawUrl.startsWith('file:') ? rawUrl.slice(5) : rawUrl;
    const resolved = resolve(process.cwd(), filePath);
    if (!existsSync(resolved)) {
      throw new Error(`SQLite database file was not found: ${resolved}`);
    }
    return resolved;
  }

  private ensureUserAuthColumns() {
    const columns = this.all(`PRAGMA table_info("User")`).map((row) =>
      String(row.name),
    );
    if (!columns.includes('emailHash')) {
      this.db.exec(`ALTER TABLE "User" ADD COLUMN "emailHash" TEXT`);
      this.db.exec(
        `CREATE UNIQUE INDEX IF NOT EXISTS "User_emailHash_key" ON "User"("emailHash")`,
      );
    }
    if (!columns.includes('passwordHash')) {
      this.db.exec(`ALTER TABLE "User" ADD COLUMN "passwordHash" TEXT`);
    }
  }

  private run(sql: string, params: SqlValue[] = []) {
    return this.db.prepare(sql).run(...params.map((value) => this.toSqlValue(value)));
  }

  private all(sql: string, params: SqlValue[] = []): Row[] {
    return this.db
      .prepare(sql)
      .all(...params.map((value) => this.toSqlValue(value))) as Row[];
  }

  private get(sql: string, params: SqlValue[] = []): Row | undefined {
    return this.db
      .prepare(sql)
      .get(...params.map((value) => this.toSqlValue(value))) as Row | undefined;
  }

  private getMarketReaction(economicEventId: string) {
    const row = this.get(
      `SELECT * FROM event_market_reactions WHERE economic_event_id = ? LIMIT 1`,
      [economicEventId],
    );
    if (!row) return null;
    return {
      id: row.id,
      economicEventId: row.economic_event_id,
      kospiTMinus5: row.kospi_t_minus_5,
      kospiTMinus4: row.kospi_t_minus_4,
      kospiTMinus3: row.kospi_t_minus_3,
      kospiTMinus2: row.kospi_t_minus_2,
      kospiTMinus1: row.kospi_t_minus_1,
      kospiT0: row.kospi_t_0,
      kospiTPlus1: row.kospi_t_plus_1,
      kospiTPlus2: row.kospi_t_plus_2,
      kospiTPlus3: row.kospi_t_plus_3,
      kospiTPlus4: row.kospi_t_plus_4,
      kospiTPlus5: row.kospi_t_plus_5,
      kospiReturnD1Pct: row.kospi_return_d1_pct,
      kospiReturnD5Pct: row.kospi_return_d5_pct,
      usdKrwReturnD1Pct: row.usd_krw_return_d1_pct,
      updatedAt: row.updated_at,
    };
  }

  private toSqlValue(value: SqlValue): string | number | null {
    if (value === undefined || value === null) return null;
    if (value instanceof Date) return this.toDbDate(value);
    if (typeof value === 'boolean') return value ? 1 : 0;
    return value;
  }

  private toDbDate(value: SqlValue): string | null {
    if (!value) return null;
    if (value instanceof Date) return value.toISOString().slice(0, 10);
    return String(value).slice(0, 10);
  }

  private toDbDateTime(value: SqlValue): string | null {
    if (!value) return null;
    if (value instanceof Date) return value.toISOString();
    return String(value);
  }

  private now(): string {
    return new Date().toISOString();
  }

  private buildMarketPriceQuery(where: Row = {}, orderBy: Row = {}, take?: number) {
    const clauses: string[] = [];
    const params: SqlValue[] = [];
    if (where?.market) {
      clauses.push('market = ?');
      params.push(where.market);
    }
    if (where?.ticker) {
      clauses.push('ticker = ?');
      params.push(where.ticker);
    }
    const limit = take ? 'LIMIT ?' : '';
    if (take) params.push(take);
    return {
      sql: [
        'SELECT * FROM "MarketPrice"',
        clauses.length ? `WHERE ${clauses.join(' AND ')}` : '',
        `ORDER BY priceDate ${orderBy?.priceDate === 'asc' ? 'ASC' : 'DESC'}`,
        limit,
      ]
        .filter(Boolean)
        .join(' '),
      params,
    };
  }
}
