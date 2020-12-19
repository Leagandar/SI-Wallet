import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards, Request, Param, Logger } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { BlockchainService } from './blockchain.service';
import { UsernameDto } from './dto/username.dto';
import { Response } from 'express'

@UseGuards(JwtAuthGuard)
@Controller('blockchain')
export class BlockchainController {
  constructor(
    private blockchainService: BlockchainService
  ) { }

  @Get('/allBalance')
  async getBalance(@Request() req, @Res() res: Response) {
    let result = await this.blockchainService.getAdresses(req.user.username).catch((Err: Error) => {
      res.status(HttpStatus.BAD_REQUEST).json({ message: Err.message });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @Get('/prices')
  async getPrices(@Res() res: Response){
    let result = await this.blockchainService.getPrices().catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    })
    res.status(HttpStatus.OK).json(result);
  }

  @Get('/news/:page')
  async getNews(@Param('page') page: number, @Res() res: Response){
    let result = await this.blockchainService.getNews(page).catch((err: Error) => {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: err.message });
    })
    res.status(HttpStatus.OK).json(result);    
  }
}
