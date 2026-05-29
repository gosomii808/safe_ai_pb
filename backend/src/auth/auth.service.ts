import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createHash, pbkdf2Sync, timingSafeEqual } from 'node:crypto';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async login(dto: LoginDto) {
    const emailHash = this.hashEmail(dto.email);
    const rows = await this.prisma.$queryRaw<
      Array<{ id: string; nickname: string; passwordHash: string | null }>
    >`
      SELECT id, nickname, passwordHash
      FROM "User"
      WHERE emailHash = ${emailHash}
      LIMIT 1
    `;
    const user = rows[0];

    if (!user?.passwordHash || !this.verifyPassword(dto.password, user.passwordHash)) {
      throw new UnauthorizedException('이메일 또는 비밀번호가 올바르지 않습니다.');
    }

    return {
      userId: user.id,
      nickname: user.nickname,
      session: this.createLocalSession(user.id),
      message: '로그인되었습니다.',
    };
  }

  private hashEmail(email: string): string {
    return createHash('sha256')
      .update(email.trim().toLowerCase())
      .digest('hex');
  }

  private verifyPassword(password: string, stored: string): boolean {
    const [algorithm, iterationsText, saltBase64, hashBase64] = stored.split(':');
    if (algorithm !== 'pbkdf2_sha256' || !iterationsText || !saltBase64 || !hashBase64) {
      return false;
    }

    const iterations = Number(iterationsText);
    if (!Number.isInteger(iterations) || iterations <= 0) return false;

    const expected = Buffer.from(hashBase64, 'base64');
    const actual = pbkdf2Sync(
      password,
      Buffer.from(saltBase64, 'base64'),
      iterations,
      expected.length,
      'sha256',
    );

    return expected.length === actual.length && timingSafeEqual(expected, actual);
  }

  private createLocalSession(userId: string): string {
    return `local:${userId}:${Date.now()}`;
  }
}
