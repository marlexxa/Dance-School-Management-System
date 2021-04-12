import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from './interfaces/tokenPayload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser(mail: string, hashedPassword: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(mail);
      const isPasswordMaatching = await bcrypt.compare(hashedPassword, user.password);
      user.password = undefined;
      if (!isPasswordMaatching) {
        throw new HttpException('Wrong e-mail or password', HttpStatus.BAD_REQUEST);
      }
      return user;
    } catch (error) {
      throw new HttpException('Wrong e-mail or password', HttpStatus.BAD_REQUEST);
    }
  }

  getCookieWithJwtToken(userID: string) {
    const payload: TokenPayload = { userID };
    const token = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_KEY,
      expiresIn: process.env.JWT_TOKEN_EXPIRESIN,
    });
    return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${process.env.JWT_TOKEN_EXPIRESIN}s`;
  }

  getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }
}
