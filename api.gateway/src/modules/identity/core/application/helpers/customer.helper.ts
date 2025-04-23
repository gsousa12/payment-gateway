import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerHelper {
  async generateCustomerId(): Promise<string> {
    const prefix = 'ct_';
    const randomPart = Math.random().toString(36).substring(2, 10);
    return `${prefix}${randomPart}`;
  }
}
