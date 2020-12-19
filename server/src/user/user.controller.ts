import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
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
  async getAll(): Promise<User[]> {
    return await this.UserService.findAll();
  }
}
