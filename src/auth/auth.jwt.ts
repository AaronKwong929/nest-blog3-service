import { jwtAdminSecret } from './../configs/password';
import { JwtService } from '@nestjs/jwt';
export const JWT = new JwtService({
    secret: jwtAdminSecret,
    signOptions: {
        expiresIn: `1d`
    }
});
