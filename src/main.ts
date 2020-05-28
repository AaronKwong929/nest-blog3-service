import { swaggerOptions } from './configs/swagger';
import { mongoServer, mongoConfigs } from './configs/mongo';
import { corsConfigs } from './configs/cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';
import * as compression from 'compression';

async function bootstrap() {
    mongoose.connect(mongoServer, mongoConfigs);
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    SwaggerModule.setup('api', app, document);
    app.use(compression());
    app.enableCors(corsConfigs);
    await app.listen(2999);
}

bootstrap();
