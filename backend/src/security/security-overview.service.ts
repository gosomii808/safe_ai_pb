import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type AccessLogRow = {
  id: string;
  action: string;
  endpoint: string;
  method: string;
  ipAddress: string | null;
  userAgent: string | null;
  success: number | boolean;
  createdAt: string;
};

type SecurityEventRow = {
  id: string;
  eventType: string;
  severity: string;
  description: string;
  metadata: string | null;
  ipAddress: string | null;
  createdAt: string;
};

type AiRequestLogRow = {
  id: string;
  requestType: string;
  modelName: string | null;
  tokenUsage: number | null;
  latencyMs: number | null;
  success: number | boolean;
  errorCode: string | null;
  createdAt: string;
};

type UserRow = {
  id: string;
  nickname: string;
  emailHash: string | null;
  passwordHash: string | null;
  createdAt: string;
};

@Injectable()
export class SecurityOverviewService {
  constructor(private readonly prisma: PrismaService) {}

  async getOverview(userId: string) {
    const [users, accessLogs, securityEvents, aiRequestLogs] =
      await Promise.all([
        this.prisma.$queryRaw<UserRow[]>`
          SELECT id, nickname, emailHash, passwordHash, createdAt
          FROM "User"
          WHERE id = ${userId}
          LIMIT 1
        `,
        this.prisma.$queryRaw<AccessLogRow[]>`
          SELECT id, action, endpoint, method, ipAddress, userAgent, success, createdAt
          FROM "AccessLog"
          WHERE userId = ${userId}
          ORDER BY createdAt DESC
          LIMIT 10
        `,
        this.prisma.$queryRaw<SecurityEventRow[]>`
          SELECT id, eventType, severity, description, metadata, ipAddress, createdAt
          FROM "SecurityEvent"
          WHERE userId = ${userId}
          ORDER BY createdAt DESC
          LIMIT 10
        `,
        this.prisma.$queryRaw<AiRequestLogRow[]>`
          SELECT id, requestType, modelName, tokenUsage, latencyMs, success, errorCode, createdAt
          FROM "AiRequestLog"
          WHERE userId = ${userId}
          ORDER BY createdAt DESC
          LIMIT 10
        `,
      ]);

    const user = users[0];
    if (!user) {
      throw new NotFoundException('사용자를 찾을 수 없습니다.');
    }

    const normalizedAccessLogs = accessLogs.map((log) => ({
      ...log,
      success: this.toBoolean(log.success),
      ipAddress: this.maskIp(log.ipAddress),
    }));
    const normalizedAiRequestLogs = aiRequestLogs.map((log) => ({
      ...log,
      success: this.toBoolean(log.success),
    }));
    const normalizedSecurityEvents = securityEvents.map((event) => ({
      ...event,
      severity: String(event.severity).toUpperCase(),
      ipAddress: this.maskIp(event.ipAddress),
    }));

    const securityScore = this.calculateSecurityScore(
      normalizedAccessLogs,
      normalizedSecurityEvents,
      normalizedAiRequestLogs,
    );

    return {
      userId,
      securityScore,
      recentAccessLogs: normalizedAccessLogs,
      recentSecurityEvents: normalizedSecurityEvents,
      recentAiRequestLogs: normalizedAiRequestLogs,
      encryptionStatus: this.buildEncryptionStatus(user),
      privacyStatus: {
        maskingEnabled: true,
        rawSensitiveValuesExposed: false,
        localSessionOnly: true,
        message:
          '개인정보와 포트폴리오 민감값은 저장 시 암호화하고, 화면과 AI 입력에는 마스킹 또는 요약값을 우선 사용합니다.',
      },
      summaryMessage: this.buildSummaryMessage(securityScore),
    };
  }

  private calculateSecurityScore(
    accessLogs: Array<{ success: boolean }>,
    securityEvents: Array<{ severity: string }>,
    aiRequestLogs: Array<{ success: boolean }>,
  ) {
    const failedAccessCount = accessLogs.filter((log) => !log.success).length;
    const failedAiCount = aiRequestLogs.filter((log) => !log.success).length;
    const highEventCount = securityEvents.filter((event) =>
      ['HIGH', 'CRITICAL'].includes(event.severity),
    ).length;
    const criticalEventCount = securityEvents.filter(
      (event) => event.severity === 'CRITICAL',
    ).length;

    let score = 80;
    score -= failedAccessCount * 8;
    score -= highEventCount * 12;
    score -= criticalEventCount * 8;
    score -= failedAiCount >= 3 ? 10 : failedAiCount * 3;

    if (
      accessLogs.length > 0 &&
      securityEvents.length === 0 &&
      failedAccessCount === 0 &&
      failedAiCount === 0
    ) {
      score = Math.max(score, 92);
    } else if (
      accessLogs.length === 0 &&
      securityEvents.length === 0 &&
      aiRequestLogs.length === 0
    ) {
      score = 88;
    }

    return Math.min(100, Math.max(0, Math.round(score)));
  }

  private buildEncryptionStatus(user: UserRow) {
    return [
      {
        name: '이메일/전화번호',
        status: 'encrypted',
        healthy: true,
        description: 'User.email, User.phone은 백엔드에서 암호화된 값으로 저장됩니다.',
      },
      {
        name: '비밀번호',
        status: user.passwordHash ? 'hashed' : 'missing',
        healthy: Boolean(user.passwordHash),
        description: user.passwordHash
          ? '비밀번호는 원문이 아니라 PBKDF2-SHA256 해시로 저장됩니다.'
          : '이전 생성 계정이라 비밀번호 해시가 없을 수 있습니다.',
      },
      {
        name: '포트폴리오 수량/금액',
        status: 'encrypted',
        healthy: true,
        description:
          'PortfolioAsset의 quantity, avgBuyPrice, investmentAmount는 암호화 저장 대상입니다.',
      },
      {
        name: 'AI 분석 입력',
        status: 'masked',
        healthy: true,
        description:
          'AI 리포트에는 원본 수량/금액 대신 요약된 포트폴리오 지표를 사용합니다.',
      },
    ];
  }

  private buildSummaryMessage(score: number) {
    if (score >= 90) {
      return '최근 보안 이벤트가 안정적이며 민감 정보 보호 상태가 양호합니다.';
    }
    if (score >= 75) {
      return '전반적인 보안 상태는 양호하지만 최근 로그를 주기적으로 확인하는 것이 좋습니다.';
    }
    if (score >= 60) {
      return '일부 실패 로그 또는 보안 이벤트가 있어 계정 활동 확인이 필요합니다.';
    }
    return '위험도가 높은 보안 이벤트가 감지되었습니다. 최근 접속 기록과 이벤트를 확인해 주세요.';
  }

  private toBoolean(value: number | boolean) {
    return value === true || value === 1;
  }

  private maskIp(ipAddress: string | null) {
    if (!ipAddress) return null;
    const parts = ipAddress.split('.');
    if (parts.length === 4) {
      return `${parts[0]}.${parts[1]}.${parts[2]}.xxx`;
    }
    return ipAddress.length > 8 ? `${ipAddress.slice(0, 6)}...` : ipAddress;
  }
}
