import { Audit } from '@common/logs/decorators/audit-log.decorator';
import { CreateMerchantRequestDto } from '@modules/identity/core/application/dtos/request/singup.request.dto';
import { AuthService } from '@modules/identity/core/application/services/auth.service';
import { AuthMapper } from '@modules/identity/core/domain/mappers/auth.mapper';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Audit('signup')
  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async signup(@Body() request: CreateMerchantRequestDto) {
    const merchantRequest = await AuthMapper.toMapperSingupRequest(request);
    const merchant = await this.authService.signup(merchantRequest);
    const response = AuthMapper.toMapperSingupResponse(merchant);
    return response;
  }
}
