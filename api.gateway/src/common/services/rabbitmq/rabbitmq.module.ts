import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'RABBITMQ_SERVICE',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => {
          const rabbitUrl = configService.get<string>('RABBITMQ_URL');
          const rabbitQueue = configService.get<string>('RABBITMQ_QUEUE');

          if (!rabbitUrl || !rabbitQueue) {
            throw new Error('RABBITMQ_URL and RABBITMQ_QUEUE must be defined in .env');
          }

          return {
            transport: Transport.RMQ,
            options: {
              urls: [rabbitUrl],
              queue: rabbitQueue,
              queueOptions: {
                durable: true,
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class RabbitMQModule {}
