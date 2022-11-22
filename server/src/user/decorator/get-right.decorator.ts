import {createParamDecorator, ExecutionContext, ForbiddenException} from "@nestjs/common";

export const GetRightDecorator = createParamDecorator(
    (right: number, ctx: ExecutionContext) => {
        const request: Express.Request = ctx.switchToHttp().getRequest();
        const user = JSON.parse(JSON.stringify(request.user));
        if (user) {
            if (user.role >= right) {
                return false;
            } else {
                throw new ForbiddenException('Недостаточно прав!');
            }
        } else {
            return false;
        }
    }
);