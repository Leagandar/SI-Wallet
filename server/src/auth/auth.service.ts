import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { LoginFormDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService
  ) {}

  async login(user: LoginFormDto): Promise<{access_token: string} | null> {
    let userData = await this.userService.validate(user)
    if(userData){
      const payload = { username: userData.username, sub: userData.id };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

}
