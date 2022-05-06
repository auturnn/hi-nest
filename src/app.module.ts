import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';

@Module({
  imports: [MoviesModule],
  // //controllers: url을 가져오고, 함수를 실행 / express의 router와 같은 존재
  controllers: [AppController],
  // // service: 비즈니스 로직 실행
  // providers: [],
})
export class AppModule {}
