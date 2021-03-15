import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../user/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(mail: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(mail);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserInterface): Promise<any> {
    const payload = { mail: user.mail, id: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
