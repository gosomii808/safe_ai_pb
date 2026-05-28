import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '../../generated/prisma/client.js';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    (
      this.$on as unknown as (
        event: string,
        callback: () => Promise<void>,
      ) => void
    )('beforeExit', async () => {
      await app.close();
    });
  }
}
