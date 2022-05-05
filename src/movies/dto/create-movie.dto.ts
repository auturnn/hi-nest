// DTO: Data Transfer Object 데이터 전송 객체
// 보면볼수록 스프링이 생각난다...
// class-transformer의 plainToClass 함수명이 변경되어 최신버전 설치시 오류. => @0.4.0버전 설치

import { IsNumber, IsOptional, IsString } from 'class-validator';

// 유효성검사를 위해 사용
export class CreateMovieDTO {
  @IsString()
  readonly title: string;
  @IsNumber()
  readonly year: number;

  @IsOptional()
  @IsString({ each: true }) // each 배열에 대한 옵션
  readonly genres: string[];
}
