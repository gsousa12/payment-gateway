import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-custom';
import { Request } from 'express';
import { PrismaService } from '@common/services/prisma/prisma.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(
    private prisma: PrismaService,
    private readonly authService: AuthService,
  ) {
    super();
  }

  async validate(req: Request): Promise<any> {
    const authHeader = req.headers['authorization'];
    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException('API key not provided');
    }

    const apiKey = authHeader.replace('Bearer ', '').trim();

    // Fazer validação da api key hasheada futuramente
    const merchant = await this.authService.validateApiKey(apiKey);

    if (!merchant) {
      throw new UnauthorizedException('Invalid API key');
    }

    return {
      id: merchant.id,
      name: merchant.name,
      email: merchant.email,
      isActive: merchant.isActive,
      type: 'api-key',
    };
  }
}
