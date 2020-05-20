import { jwtAdminSecret } from './../configs/password';
import { JwtService } from '@nestjs/jwt';

export const JWTAdmin = new JwtService({
    secret: jwtAdminSecret,
    signOptions: {
        expiresIn: `7d`
    }
});

export const JWTMember = new JwtService({
    secret: jwtAdminSecret,
    signOptions: {
        expiresIn: `7d`
    }
});
