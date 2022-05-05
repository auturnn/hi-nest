import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      //어떤 decorator도 없는 어떤 property의 object를 걸러낸다
      whitelist: true,
      //위와 더불어 추가적인 보안책. 이상한 데이터(존재하지않는)의 request를 막는 옵션
      forbidNonWhitelisted: true,
      //우리가 원하는 실제 타입으로의 변환을 담당(post id:"1" => id:1)
      transform: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
