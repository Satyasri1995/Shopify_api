import { JwtService } from '@nestjs/jwt';
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService:JwtService){}
  use(req: any, res: any, next: () => void) {
    const jwt = req.headers.Authorization;
    const token = jwt?.split(" ")[1]||"";
    const verify = this.jwtService.verify(jwt);
    if(!verify){
      throw new UnauthorizedException('Invalid JWToken')
    }
    next();
  }
}
