import { WishlistSchema, WishlistSchemaName } from './models/wishlist.model';
import { OrderSchema, OrderSchemaName } from './models/order.model';
import { MongooseModule } from '@nestjs/mongoose';

import { CartSchema, CartSchemaName } from './models/cart.model';
import { Module } from "@nestjs/common";
import { CartController } from "./controllers/cart.controller";
import { OrdersController } from "./controllers/orders.controller";
import { WishlistController } from "./controllers/wishlist.controller";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { WishlistService } from "./services/wishlist.service";

@Module({
  imports:[
    MongooseModule.forFeature([
      {name:CartSchemaName,schema:CartSchema},
      {name:OrderSchemaName,schema:OrderSchema},
      {name:WishlistSchemaName,schema:WishlistSchema}
    ])
  ],
  controllers: [
    CartController,
    OrdersController,
    WishlistController
  ],
  providers: [CartService, WishlistService, OrderService]
})
export class ShopModule {}
