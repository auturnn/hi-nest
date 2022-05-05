import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

//기본 url
@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}
  @Get()
  getAllMovies(): Movie[] {
    return this.moviesService.getAllMovies();
  }

  @Get('search')
  search(@Query('year') year: string) {
    return `we are searching for a movie made after:${year}`;
  }

  //id를 param하는 get이 다른 Get보다 상위에 작성되어있는 경우 밑의 다른 url에도 영향을 미친다.
  //expressJS에서도 겪는 일이기에 기억해둘것.
  @Get('/:id')
  getOneMovie(@Param('id') id: string): Movie {
    return this.moviesService.getOneMovie(id);
  }

  @Post()
  create(@Body() movieData) {
    return this.moviesService.createMovie(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.moviesService.deleteOne(id);
  }

  @Patch('/:id')
  path(@Param('id') id: string, @Body() updateData) {
    return `this will patch a movie with the id: ${id}`;
  }
}
