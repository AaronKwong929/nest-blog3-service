# 文件描述

```ts
// password.ts
export const salt = *****
export const jwtAdminSecret = ****
```

```ts
// corsConfigs.ts
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
export const corsConfigs: CorsOptions = {
    origin: '*',
    methods: ['GET', ' POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    exposedHeaders: ['WWW-Authenticate', 'Server-Authorization']
};
```

```ts
// mongo.ts
import { ConnectionOptions } from 'mongoose';
export const mongoServer = ``;
export const mongoConfigs: ConnectionOptions = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
};
```

```ts
// swagger.ts
import { DocumentBuilder } from '@nestjs/swagger';
export const swaggerOptions = new DocumentBuilder()
    .setTitle(`Aaron: Blog4 的api文档`)
    .setDescription(`从 Koa.js 迁移到 Nest.js 的Api文档`)
    .setVersion(`1.0`)
    .addBearerAuth(
        { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
        'authorization'
    )
    .build();
```
