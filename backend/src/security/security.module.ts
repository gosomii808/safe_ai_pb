import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { AnonymizerService } from './anonymizer.service';
import { EncryptionService } from './encryption.service';
import { MaskingService } from './masking.service';
import { SecurityController } from './security.controller';
import { SecurityOverviewService } from './security-overview.service';

@Module({
  imports: [PrismaModule],
  controllers: [SecurityController],
  providers: [
    EncryptionService,
    MaskingService,
    AnonymizerService,
    SecurityOverviewService,
  ],
  exports: [EncryptionService, MaskingService, AnonymizerService],
})
export class SecurityModule {}
