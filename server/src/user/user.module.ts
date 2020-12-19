import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { userProviders }from './user.providers';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [UserService, ...userProviders],
  exports: [UserService, ...userProviders],
  controllers: [UserController]
})
export class UserModule {}
