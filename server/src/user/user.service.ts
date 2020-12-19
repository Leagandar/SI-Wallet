import { Injectable, Inject, Logger } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../core/constants';
import * as sha256 from 'sha256'
import { LoginFormDto } from 'src/auth/dto/login.dto';
import { BlockchainService } from 'src/blockchain/blockchain.service';


@Injectable()
export class UserService {

  constructor(
    @Inject(USER_REPOSITORY) public readonly userRepository: typeof User,
    public readonly blockchain: BlockchainService
  ) { }

  async create(user: UserDto): Promise<User> {
    if(await this.userRepository.findOne({where: {username: user.username}})){
      throw new Error("User with this username already exists");
    }
    let object = user;
    object.password = sha256(user.password);
    let newUser = await this.userRepository.create<User>(object);
    newUser.password = undefined;
    Logger.log(JSON.stringify(await this.blockchain.createAddress(newUser.username).catch((err: Error) => { throw Logger.error(err) })));
    return newUser
  }

  async validate(user: LoginFormDto): Promise<User | null> {
    return await this.userRepository.findOne<User>({
      where: {
        email: user.email,
        password: sha256(user.password)
      },
      attributes: { exclude: ['password'] }
    });
  }

  async findOneByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { email } });
  }

  async findOneById(id: number): Promise<User> {
    return await this.userRepository.findOne<User>({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll<User>();
  }
}