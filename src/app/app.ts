
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from '../app.module';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';

 export default async () => {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());

    app.useStaticAssets(join(__dirname, '..', '../public'), {
        prefix: '/static',
      });
    return app;
}



