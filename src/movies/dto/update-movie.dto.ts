// @nestjs/mapped-types: 타입을 변환시키고, 사용할 수 있도록 도와주는 패키지
import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDTO } from './create-movie.dto';

//PartialType : 근본이 되는 DTO의 변수들을 선택 사항들로 변환
//(title: string; => title?:string;)
export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}
