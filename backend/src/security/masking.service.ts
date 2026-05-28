import { Injectable } from '@nestjs/common';

@Injectable()
export class MaskingService {
  maskEmail(email: string | null | undefined): string {
    if (!email) {
      return '';
    }

    const [localPart, domain] = email.split('@');
    if (!localPart || !domain) {
      return this.maskText(email);
    }

    return `${this.maskText(localPart, 2)}@${domain}`;
  }

  maskPhone(phone: string | null | undefined): string {
    if (!phone) {
      return '';
    }

    const digits = phone.replace(/\D/g, '');
    if (digits.length <= 4) {
      return '*'.repeat(digits.length);
    }

    const head = digits.slice(0, 3);
    const tail = digits.slice(-4);
    return `${head}${'*'.repeat(Math.max(digits.length - 7, 1))}${tail}`;
  }

  maskAmount(amount: number | string | null | undefined): string {
    return this.maskNumericValue(amount);
  }

  maskQuantity(quantity: number | string | null | undefined): string {
    return this.maskNumericValue(quantity);
  }

  private maskText(value: string, visiblePrefixLength = 1): string {
    if (value.length <= visiblePrefixLength) {
      return '*'.repeat(value.length);
    }

    return `${value.slice(0, visiblePrefixLength)}${'*'.repeat(
      value.length - visiblePrefixLength,
    )}`;
  }

  private maskNumericValue(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '';
    }

    const numericText = String(value).replace(/,/g, '');
    const sign = numericText.startsWith('-') ? '-' : '';
    const unsignedText = sign ? numericText.slice(1) : numericText;
    const [integerPart, decimalPart] = unsignedText.split('.');

    if (!integerPart || !/^\d+$/.test(integerPart)) {
      return this.maskText(String(value));
    }

    const visibleLength = integerPart.length <= 3 ? 1 : 2;
    const maskedInteger = `${integerPart.slice(0, visibleLength)}${'*'.repeat(
      Math.max(integerPart.length - visibleLength, 1),
    )}`;

    return `${sign}${maskedInteger}${decimalPart ? '.*' : ''}`;
  }
}
