import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { validatorMiddleware } from './modules/admin/admin.middleware';

@Module({
    imports: [AdminModule, CommonModule],
    controllers: [AppController],
    providers: [AppService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(validatorMiddleware).forRoutes(`admin`)
    }
}
