import { Module } from '@nestjs/common';
import { AnonymizerService } from './anonymizer.service';
import { EncryptionService } from './encryption.service';
import { MaskingService } from './masking.service';

@Module({
  providers: [EncryptionService, MaskingService, AnonymizerService],
  exports: [EncryptionService, MaskingService, AnonymizerService],
})
export class SecurityModule {}
