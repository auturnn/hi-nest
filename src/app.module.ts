import { Module } from '@nestjs/common';
import { MoviesController } from './movies/movies.controller';
import { MoviesService } from './movies/movies.service';

@Module({
  imports: [],
  //controllers: url을 가져오고, 함수를 실행 / express의 router와 같은 존재
  controllers: [MoviesController],
  // service: 비즈니스 로직 실행
  providers: [MoviesService],
})
export class AppModule {}
