# 使用 Nest.js 重构 Blog3 的后端服务

免去 npm install 的 init

```cmd
nest new nest-blog3-server -s
```

## 有两种方法可以实现鉴权

一种是中间件鉴权，注册在 app.module.ts，鉴权失败抛出 401 错误（这里可以自定义，可以 exclude 部分路由

```ts
// app.module.ts
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(validatorMiddleware)
            .exclude(
                { path: `/admin/login`, method: RequestMethod.POST },
                { path: `/admin/add`, method: RequestMethod.POST }
            )
            .forRoutes(`admin`);
    }
}
```

```ts
// admin.middleware.ts
import {
    Injectable,
    NestMiddleware,
    UnauthorizedException,
    HttpStatus
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class validatorMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: Function): void {
        /**
         * 这里写鉴权逻辑
         */
        next();
    }
}
```

另一种是路由守卫，注册在对应路由模块的 controller 下，鉴权失败返回 false，禁止访问路由，抛出 403 错误，(可以 throw 401 错误

```ts
// /src/auth/auth.guard.ts
@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.headers);
        const {
                route: { path }
            } = request,
            passValidateRoutes = [`/admin/login`, `/admin/add`];
        if (passValidateRoutes.indexOf(path) > -1) return true;
        /**
         * 这里写鉴权逻辑
         */
        return false;
    }
}
```

```ts
// 在控制器内使用
// admin.controller.ts
@Controller('admin')
@UseGuards(AuthGuard)
@ApiTags('管理模块')
```

### 埋点对应操作，eventStatus 0 为成功， -1 为失败

| eventCode |      事件      |
| :-------: | :------------: |
|   1000    |      注册      |
|   1001    |      登陆      |
|   1002    |    更改密码    |
|   1003    | 查询管理员列表 |
|   1004    |   删除管理员   |
|   2001    |  获取文章列表  |
|   2002    |    删除文章    |
|   2003    |  更改文章状态  |
|   2004    |    新建文章    |
|   2005    |    编辑文章    |
|   2006    |    保存文章    |
|   3001    |  获取评论列表  |
|   3002    |    删除评论    |
|   3003    |  更改评论状态  |
|   4001    |  获取最近动态  |
|   4002    |  新建最近动态  |
|   4003    |  删除最近动态  |
|   9999    |  查看操作日志  |

## 注意事项

1. 如果发现代码见鬼了：swagger 不更新，挂载路由不更新 ---> 把 /dist 文件夹删掉重新起服务即可

2. 需要引入 Node 原生模块的话，需要 1. npm install --save-dev @types/node，tsconfig.json 2. 将 target 改成大于 es2017（网上说的） 然后在 const xxx = require('xxx') 改成 import xxx = require('xxx')即可

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

-   Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
-   Website - [https://nestjs.com](https://nestjs.com/)
-   Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
