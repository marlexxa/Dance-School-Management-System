import { HttpException, HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserInterface } from '../user/interfaces/user.interface';
import { User } from '../user/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userService: UserService, private jwtService: JwtService) {}

  async validateUser(mail: string, hashedPassword: string): Promise<any> {
    try {
      const user = await this.userService.findByEmail(mail);
      const isPasswordMaatching = await bcrypt.compare(hashedPassword, user.password);
      if (!isPasswordMaatching) {
        throw new HttpException('Wrong e-mail or password', HttpStatus.BAD_REQUEST);
      }
      const { password, ...userDataWithoutPassword } = user;
      return userDataWithoutPassword;
    } catch (error) {
      throw new HttpException('Wrong e-mail or password', HttpStatus.BAD_REQUEST);
    }
  }

  async login(user: UserInterface): Promise<any> {
    const payload = { mail: user.mail, id: user._id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
