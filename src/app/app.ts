
import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { HttpExceptionFilter } from '../common/filters/httpException.filter';
import { TransformInterceptor } from '../common/interceptors/transform.interceptor';
import SwaggerConfig from '../config/swagger.config'

 export default async () => {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalFilters(new HttpExceptionFilter());
    app.useGlobalInterceptors(new TransformInterceptor());
    await SwaggerConfig(app);
    return  app;
}



