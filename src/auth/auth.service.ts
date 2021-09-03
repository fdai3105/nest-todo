import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from '../http-response';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(email: string, pass: string) {
    const user = await this.usersService.findOne(email);
    if (user) {
      const compare = await bcrypt.compare(pass, user.pass);
      if (user && compare)
        return {
          ...user,
          access_token: this.jwtService.sign({ email: email, pass: pass }),
        };
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } else {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(user: RegisterDto) {
    const check = await this.usersService.findOne(user.email);
    if (check) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      await this.usersService.insert(user);
      return new HttpResponse(HttpStatus.OK, 'Register success');
    } catch (e) {
      throw new HttpException('Something wrong: ' + e, HttpStatus.BAD_REQUEST);
    }
  }
}
