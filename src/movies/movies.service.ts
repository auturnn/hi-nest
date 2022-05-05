import { Injectable } from '@nestjs/common';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAllMovies(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: string): Movie {
    // +id => string타입을 number형으로 사용가능
    return this.movies.find((movie) => movie.id === +id);
  }

  deleteOne(id: string): boolean {
    this.movies.filter((movie) => movie.id !== +id);
    return true;
  }

  createMovie(movieData: any) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }
}
