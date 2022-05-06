import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';

@Module({
  //컨트롤러에서 Injectable을 통해 Service(provider)를 가져와 사용한다.
  //스프링의 의존성 주입과 비슷한 개념인듯하다.
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
