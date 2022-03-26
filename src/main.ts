import { Logger } from '@nestjs/common';
import MyApp from './app/app';

async function bootstrap() {
  const app = await MyApp();

  await app.listen(3000, () => {
    // new LiveService().startLiveService();
    Logger.log('http://localhost:3000');
  });
}
bootstrap();
