import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    console.log("HELLO")
    const request = context.switchToHttp().getRequest()
    console.log(request.user);
    return request.isAuthenticated()
  }
}