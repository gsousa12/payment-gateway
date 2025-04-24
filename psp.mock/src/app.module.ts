import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PspController } from './psp.controller';
import { PspService } from './psp.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [PspController],
  providers: [PspService],
})
export class AppModule {}
