import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpResponse } from '../http-response';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user) {
      const compare = await bcrypt.compare(loginDto.pass, user.pass);
      if (user && compare) {
        return {
          ...user,
          accessToken: this.jwtService.sign({
            email: loginDto.email,
            pass: loginDto.pass,
          }),
        };
      }
      if (!compare) {
        throw new HttpException(
          'Wrong password or email',
          HttpStatus.FORBIDDEN,
        );
      }
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } else {
      throw new HttpException('User not found', HttpStatus.UNAUTHORIZED);
    }
  }

  async register(user: RegisterDto) {
    const check = await this.usersService.findByEmail(user.email);
    if (check) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    try {
      const temp = user.pass;
      await this.usersService.insert(user);
      const login = await this.login({ email: user.email, pass: temp });
      return new HttpResponse(HttpStatus.OK, 'Register success', login);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
