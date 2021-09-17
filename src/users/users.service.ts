import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { hash } from 'typeorm/util/StringUtils';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  findByEmail(email: string) {
    return this.repository.findOne({ where: { email: email } });
  }

  async insert(user: RegisterDto) {
    user.pass = await bcrypt.hash(user.pass, 10);
    return this.repository.insert(user);
  }
}
