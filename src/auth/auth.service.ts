import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserInterface): Promise<any> {
    const payload = { login: user.surname, id: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
