import { Logger } from '@nestjs/common';
import MyApp from './app/app'
import { LiveService } from './modules/live/live.service'

async function bootstrap() {
  const app = await MyApp();

  await app.listen(3000, () => {
    new LiveService().startLiveService();
    Logger.log("文档接口：http://localhost:3000/api")
  });
}
bootstrap();
