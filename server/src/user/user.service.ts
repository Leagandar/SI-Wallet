import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { USER_REPOSITORY } from '../core/constants';
import * as sha256 from 'sha256'
import { LoginFormDto } from 'src/auth/dto/login.dto';


@Injectable()
export class UserService {

  constructor(
    @Inject(USER_REPOSITORY) public readonly userRepository: typeof User
  ) { }

  async create(user: UserDto): Promise<User> {
    let object = user;
    object.password = sha256(user.password);
    return await this.userRepository.create<User>(object);
  }

  async validate(user: LoginFormDto): Promise<User | null> {
    return await this.userRepository.findOne<User>({
      where: {
        email: user.email,
        password: sha256(user.password)
      },
      attributes: {exclude: ['password']}
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