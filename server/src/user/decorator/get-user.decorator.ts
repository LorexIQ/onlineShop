import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUserDecorator = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: Express.Request = ctx.switchToHttp().getRequest();
    const user = JSON.parse(JSON.stringify(request.user));
    if (user) {
        delete user.hash;
        delete user.__v;
        if (data) {
            return user[data];
        } else {
            return user;
        }
    } else {
        return null;
    }
  }
);