import { Body, Controller, Get, Logger, Post, Req, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('user')
export class UserController {
  constructor(private UserService: UserService) { }

  // @Post('create')
  // async create(@Body() userDTO: UserDto): Promise<User>{
  //   return await this.UserService.create(userDTO);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(@Request() request): Promise<any> {
    Logger.log("USER", JSON.stringify(request.user));
    return await this.UserService.findOneById(request.user.userId);
  }
}
