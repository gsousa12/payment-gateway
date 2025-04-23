import { Injectable, NotFoundException } from '@nestjs/common';
import { BcryptAdapter } from '@common/adapters/bcrypt.adapter';
import { Response } from 'express';

@Injectable()
export class AuthHelper {
  constructor(private readonly bcryptAdapter: BcryptAdapter) {}

  async generateUserTemporaryPassword(): Promise<string> {
    const temporaryPasswordLength = 10;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';

    for (let i = 0; i < temporaryPasswordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }

    return password;
  }

  async hashPassword(password: string): Promise<string> {
    return await this.bcryptAdapter.hash(password);
  }

  async comparePassword(password: string, userPassword: string): Promise<boolean> {
    return await this.bcryptAdapter.compare(password, userPassword);
  }

  async implementsCookies(access_token: string, res: Response) {
    res.cookie('access_token', access_token, {
      httpOnly: true,
      secure: process.env.NODE_MODE === 'development' ? false : true || true,
      sameSite: 'strict',
      maxAge: 60 * 60 * 1000,
    });
  }

  async clearCookies(res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_MODE === 'development' ? false : true || true,
      sameSite: 'strict',
    });
  }
}
