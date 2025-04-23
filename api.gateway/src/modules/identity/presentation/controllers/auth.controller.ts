import { Public } from '@common/decorators/public.decorator';
import { Audit } from '@common/logs/decorators/audit-log.decorator';
import { CreateApiResponse } from '@common/utils/api-response';
import { MainErrorResponse } from '@common/utils/main-error-response';
import { LoginRequestDto } from '@modules/identity/core/application/dtos/request/login.request.dto';
import { SignupRequestDto } from '@modules/identity/core/application/dtos/request/singup.request.dto';
import { AuthService } from '@modules/identity/core/application/services/auth.service';
import { AuthMapper } from '@modules/identity/core/domain/mappers/auth.mapper';
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Audit('signup')
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() request: SignupRequestDto) {
    try {
      const merchantRequest = await AuthMapper.toMapperSingupRequest(request);
      const merchant = await this.authService.signup(merchantRequest);
      const response = AuthMapper.toMapperSingupResponse(merchant);
      return CreateApiResponse('User created successfully', response);
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Public()
  @Audit('login')
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() request: LoginRequestDto, @Res({ passthrough: true }) res: Response) {
    try {
      await this.authService.login(request, res);
      return CreateApiResponse('Logged in successfully', {});
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Post('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    try {
      await this.authService.logout(res);
      return CreateApiResponse('Logged out successfully', {});
    } catch (error) {
      return MainErrorResponse(error);
    }
  }

  @Audit('change-password')
  @Post('/change-password')
  @HttpCode(HttpStatus.OK)
  async changePassword() {}
}
