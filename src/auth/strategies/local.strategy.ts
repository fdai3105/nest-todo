import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'pass' });
  }

  async validate(email: string, pass: string) {
    const user = this.authService.login(email, pass);
    if (user) return user;
    throw new UnauthorizedException();
  }
}
