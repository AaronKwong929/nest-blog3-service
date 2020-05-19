import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    mongoose.connect(`mongodb://localhost/nestBlog`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });

    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    const options = new DocumentBuilder()
        .setTitle(`Aaron: Blog3的api文档`)
        .setDescription(`从 Koa.js 迁移到 Nest.js 的Api文档`)
        .setVersion(`1.0`)
        .addBearerAuth(
            { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
            'authorization'
        )
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
