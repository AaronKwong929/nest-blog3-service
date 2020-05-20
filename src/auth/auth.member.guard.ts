import { JWTMember } from './auth.jwt';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class MemberAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const {
            headers: { authorization }
        } = request;
        try {
            JWTMember.verify((authorization as string).split(' ')[1]);
            return true;
        } catch (e) {
            throw new UnauthorizedException({
                message: `未授权或授权信息过期`
            });
        }
    }
}
