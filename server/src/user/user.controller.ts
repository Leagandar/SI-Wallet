import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service'
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private UserService: UserService) { }

  // @Post('create')
  // async create(@Body() userDTO: UserDto): Promise<User>{
  //   return await this.UserService.create(userDTO);
  // }

  // @Get()
  // async getAll(): Promise<User[]> {
  //   return await this.UserService.findAll();
  // }
}
