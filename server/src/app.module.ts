import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './core/database/database.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    UserModule, AuthModule, DatabaseModule,
    ConfigModule.forRoot({
      isGlobal: true,
    })

  ],
})
export class AppModule { }
