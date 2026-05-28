import { Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;
const ENCRYPTED_PREFIX = 'v1';

export type EncryptableValue = string | number | boolean | null | undefined;

export const SENSITIVE_ENCRYPTION_FIELDS = [
  'email',
  'phone',
  'riskType',
  'investmentGoal',
  'quantity',
  'avgBuyPrice',
  'investmentAmount',
] as const;

type SensitiveEncryptionField = (typeof SENSITIVE_ENCRYPTION_FIELDS)[number];

@Injectable()
export class EncryptionService {
  encrypt(value: EncryptableValue): string | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }

    const iv = randomBytes(IV_LENGTH);
    const cipher = createCipheriv(ALGORITHM, this.getEncryptionKey(), iv, {
      authTagLength: AUTH_TAG_LENGTH,
    });
    const ciphertext = Buffer.concat([
      cipher.update(String(value), 'utf8'),
      cipher.final(),
    ]);
    const authTag = cipher.getAuthTag();

    return [
      ENCRYPTED_PREFIX,
      iv.toString('base64'),
      authTag.toString('base64'),
      ciphertext.toString('base64'),
    ].join(':');
  }

  decrypt(value: string | null | undefined): string | null | undefined {
    if (value === null || value === undefined) {
      return value;
    }

    const [prefix, ivBase64, authTagBase64, ciphertextBase64] =
      value.split(':');

    if (
      prefix !== ENCRYPTED_PREFIX ||
      !ivBase64 ||
      !authTagBase64 ||
      !ciphertextBase64
    ) {
      throw new Error('Invalid encrypted value format.');
    }

    const decipher = createDecipheriv(
      ALGORITHM,
      this.getEncryptionKey(),
      Buffer.from(ivBase64, 'base64'),
      { authTagLength: AUTH_TAG_LENGTH },
    );
    decipher.setAuthTag(Buffer.from(authTagBase64, 'base64'));

    return Buffer.concat([
      decipher.update(Buffer.from(ciphertextBase64, 'base64')),
      decipher.final(),
    ]).toString('utf8');
  }

  encryptSensitiveFields<T extends Record<string, unknown>>(data: T): T {
    return Object.entries(data).reduce((acc, [key, value]) => {
      if (this.isSensitiveEncryptionField(key)) {
        return { ...acc, [key]: this.encrypt(value as EncryptableValue) };
      }

      return { ...acc, [key]: value };
    }, {} as T);
  }

  private isSensitiveEncryptionField(
    key: string,
  ): key is SensitiveEncryptionField {
    return SENSITIVE_ENCRYPTION_FIELDS.includes(
      key as SensitiveEncryptionField,
    );
  }

  private getEncryptionKey(): Buffer {
    const rawKey = process.env.ENCRYPTION_KEY?.trim();

    if (!rawKey) {
      throw new Error('ENCRYPTION_KEY environment variable is required.');
    }

    const candidates = [
      this.decodeHexKey(rawKey),
      this.decodeBase64Key(rawKey),
      Buffer.from(rawKey, 'utf8'),
    ].filter((key): key is Buffer => key !== null);

    const key = candidates.find((candidate) => candidate.length === 32);

    if (!key) {
      throw new Error(
        'ENCRYPTION_KEY must decode to exactly 32 bytes for AES-256.',
      );
    }

    return key;
  }

  private decodeHexKey(rawKey: string): Buffer | null {
    if (!/^[a-f0-9]{64}$/i.test(rawKey)) {
      return null;
    }

    return Buffer.from(rawKey, 'hex');
  }

  private decodeBase64Key(rawKey: string): Buffer | null {
    try {
      return Buffer.from(rawKey, 'base64');
    } catch {
      return null;
    }
  }
}
