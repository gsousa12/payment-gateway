import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { PspService } from './psp.service';

@Controller('psp')
export class PspController {
  constructor(private readonly pspService: PspService) {}

  @Post('simulate')
  @HttpCode(HttpStatus.OK)
  async analyze(@Body() request: any) {
    return this.pspService.simulateAnalysis(request);
  }
}
