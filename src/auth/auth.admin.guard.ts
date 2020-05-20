import { JWTAdmin } from './auth.jwt';
import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const {
                route: { path },
                headers: { authorization }
            } = request,
            passValidateRoutes = [`/admin/login`, `/admin/add`];
        if (passValidateRoutes.indexOf(path) > -1) return true;
        try {
            JWTAdmin.verify((authorization as string).split(' ')[1]);
            return true;
        } catch (e) {
            throw new UnauthorizedException({ message: `授权信息过期` });
        }
    }
}
