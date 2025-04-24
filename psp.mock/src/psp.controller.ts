import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

@Controller('psp')
export class PspController {
  @Post('analyze')
  @HttpCode(HttpStatus.OK)
  async analyze(@Body() request: any) {
    try {
    } catch (error) {}
  }
}
