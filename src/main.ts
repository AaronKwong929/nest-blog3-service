import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as mongoose from 'mongoose';

async function bootstrap() {
    mongoose.connect(`mongodb://localhost/blog3`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true
    });

    const app = await NestFactory.create(AppModule);

    const options = new DocumentBuilder()
        .setTitle(`nest的api文档`)
        .setDescription(
            `api docs created at ${new Date().toLocaleDateString()}`
        )
        .setVersion(`1.0`)
        .build();

    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
