import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './modules/user/user.module';
import { ProductModule } from './modules/product/product.module';
import { ShopModule } from './modules/shop/shop.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { ErrorHandlerFilter } from './utils/ErrorHandlerFilter';
import { ResponseInterceptor } from './utils/ResponseInterceptor';

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
  providers:[
    {
      provide:APP_FILTER,
      useClass:ErrorHandlerFilter
    },
    {
      provide:APP_INTERCEPTOR,
      useClass:ResponseInterceptor
    }
  ]
})
export class AppModule {}
