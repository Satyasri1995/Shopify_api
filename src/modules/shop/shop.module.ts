import { Module } from "@nestjs/common";
import { CartController } from "./controllers/cart.controller";
import { OrdersController } from "./controllers/orders.controller";
import { WishlistController } from "./controllers/wishlist.controller";
import { CartService } from "./services/cart.service";
import { OrderService } from "./services/order.service";
import { WishlistService } from "./services/wishlist.service";

@Module({
  controllers: [
    CartController,
    OrdersController,
    WishlistController
  ],
  providers: [CartService, WishlistService, OrderService]
})
export class ShopModule {}
