import { createParamDecorator, ExecutionContext, ForbiddenException } from "@nestjs/common";
import { Request } from "express";

export const CurrentUser = createParamDecorator((data, ctx: ExecutionContext) => {
  const req: Request = ctx.switchToHttp().getRequest();
  if (!req.user) throw new ForbiddenException('请先登录')
  return req.user
})