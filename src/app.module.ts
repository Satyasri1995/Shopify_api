import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ShopModule } from './modules/shop/shop.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE'),
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    ProductModule,
    ShopModule,
  ],
})
export class AppModule {}
