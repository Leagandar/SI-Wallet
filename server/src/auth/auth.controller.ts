import { Body, Controller, Get, Post, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { UserDto } from 'src/user/dto/user.dto';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Response } from 'express'
import { LoginFormDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService  
  ){}

  @Post('signup')
  async create(@Body() body: UserDto, @Res() res: Response){
    let user: User | void = await this.userService.create(body).catch((err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
    })
    res.status(HttpStatus.OK).json(user)
  }
  
  @Post('login')
  async login(@Body() body: LoginFormDto, @Res() res: Response){
    let validate = await this.authService.login(body).catch((err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({error: err.message});
    })
    console.log("validate: ", validate)
    if(validate){
      res.status(HttpStatus.OK).json(validate)
      return;
    }
    res.status(HttpStatus.UNAUTHORIZED).json({error: "Wrong login or password"})
  }
}
