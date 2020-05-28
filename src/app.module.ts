import { Module } from '@nestjs/common';
import { AdminModule } from './modules/admin/admin.module';
import { CommonModule } from './modules/common/common.module';
import { AuthModule } from './modules/auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path'


@Module({
    imports: [AdminModule, CommonModule, AuthModule, ServeStaticModule.forRoot({rootPath: join(__dirname, '..', 'management')})]
})
export class AppModule {}
