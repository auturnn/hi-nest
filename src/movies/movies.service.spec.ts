//jest사용
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { title } from 'process';
import { stringify } from 'querystring';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  //테스트를 실행하기 전에 실행되는 부분
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
    // 거의 매번 실행되지만 실행되지 않는 경우 또한 존재하기에 주석처리
    // service.createMovie({
    //   title: 'TestMovie',
    //   genres: ['test'],
    //   year: 2022,
    // });
  });

  describe('getAllMovies', () => {
    it('should return an array', () => {
      const result = service.getAllMovies();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOneMovie', () => {
    it('should return a movie', () => {
      service.createMovie({
        title: 'TestMovie',
        genres: ['test'],
        year: 2022,
      });
      const result = service.getOneMovie(1);
      expect(result).toBeDefined();
      expect(result.id).toEqual(1);
    });

    it('sholud return 404 error', () => {
      try {
        service.getOneMovie(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toEqual('movie with ID:999 not found');
      }
    });
  });
  describe('deleteMovie', () => {
    it('deletes a movie', () => {
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2022,
      });
      const beforeResult = service.getAllMovies().length;
      service.deleteOne(1);
      const afterResult = service.getAllMovies().length;
      expect(afterResult).toBeLessThan(beforeResult);
    });

    it('should return 404 error', () => {
      try {
        service.deleteOne(999);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
  describe('create movie', () => {
    console.log('hi');
    it('create movie', () => {
      const beforeCreate = service.getAllMovies().length;
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2022,
      });
      const afterCreate = service.getAllMovies().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'testMovie',
        genres: ['test'],
        year: 2022,
      });
      service.updateMovie(1, { title: 'updateMovie' });
      const afterResult = service.getOneMovie(1);
      expect(afterResult.title).toEqual('updateMovie');
    });
    it('should throw a NotFoundException', () => {
      try {
        service.updateMovie(999, { title: 'doNotExec' });
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
