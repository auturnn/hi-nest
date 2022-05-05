import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDTO } from './dto/create-movie.dto';
import { UpdateMovieDTO } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  private movies: Movie[] = [];
  getAllMovies(): Movie[] {
    return this.movies;
  }

  getOneMovie(id: number): Movie {
    // +id => string타입을 number형으로 사용가능
    const movie = this.movies.find((movie) => movie.id === id);
    if (!movie) {
      throw new NotFoundException(`movie with ID:${id} not found`);
    }
    return movie;
  }

  deleteOne(id: number) {
    this.getOneMovie(id);
    this.movies = this.movies.filter((movie) => movie.id !== +id);
  }

  createMovie(movieData: CreateMovieDTO) {
    this.movies.push({
      id: this.movies.length + 1,
      ...movieData,
    });
  }

  updateMovie(id: number, updateData: UpdateMovieDTO) {
    const movie = this.getOneMovie(id);
    this.deleteOne(id);
    this.movies.push({ ...movie, ...updateData });
  }
}
