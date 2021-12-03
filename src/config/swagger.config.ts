import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default async (app: INestApplication) => {
    const options = new DocumentBuilder()
        .setTitle('辣鸡视频')
        .setDescription('没有描述！！！')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
}

