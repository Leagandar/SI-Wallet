import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { BlockchainModule } from './blockchain/blockchain.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Module({
  imports: [
    UserModule, AuthModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    BlockchainModule

  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})
export class AppModule { }
