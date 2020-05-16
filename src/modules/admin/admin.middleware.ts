import {
    Injectable,
    NestMiddleware,
    HttpException,
    HttpStatus
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class validatorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function): void {
        console.log(req.headers);
        throw new HttpException(
            {
                message: `鉴权失败`,
                status: -1,
                statusCode: HttpStatus.UNAUTHORIZED
            },
            HttpStatus.UNAUTHORIZED
        );
        next();
    }
}
