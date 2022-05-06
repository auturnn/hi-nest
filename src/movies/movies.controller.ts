import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

//decorate도 스프링이 생각난다.

//기본 url
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  //@Req(), @Res를 이용하여 express를 직접적으로 이용할 수 있다.
  // @Get()
  // getMovies(@Req() req, @Res() res): Movie[] {
  //   res.json();
  //   return this.moviesService.getAllMovies();
  // }

  //   @Get('search')
  //   search(@Query('year') year: string) {
  //     return `we are searching for a movie made after:${year}`;
  //   }

  //id를 param하는 get이 다른 Get보다 상위에 작성되어있는 경우 밑의 다른 url에도 영향을 미친다.
  //expressJS에서도 겪는 일이기에 기억해둘것.
  @Get(':id')
  getOneMovie(@Param('id') id: number): Movie {
    return this.moviesService.getOneMovie(id);
  }

  @Post()
  create(@Body() movieData: CreateMovieDTO) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moviesService.deleteOne(id);
  }

  @Patch(':id')
  patch(@Param('id') id: number, @Body() updateData: UpdateMovieDTO) {
    return this.moviesService.updateMovie(id, updateData);
  }
}
