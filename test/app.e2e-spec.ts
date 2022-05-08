import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  //beforeEach => beforeAll
  //beforeAll로 바꿈으로 인해 계속 새로운 app을 생성하는 것이 아닌 한번의 실행후 모든 테스트를 기억
  //또한 원래 예제는 테스팅할때마다 새로운 application을 생성하는 중 main.ts != spec.ts
  //그렇기에 main.ts 작동하지 않아 원하는 결과가 나올 수 없을 수도 있다.
  //따라서 설정을 그대로 가져와 사용한다.
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        //어떤 decorator도 없는 어떤 property의 object를 걸러낸다
        whitelist: true,
        //위와 더불어 추가적인 보안책. 이상한 데이터(존재하지않는)의 request를 막는 옵션
        forbidNonWhitelisted: true,
        //우리가 원하는 실제 타입으로의 변환을 담당(post id:"1" => id:1)
        transform: true,
      }),
    );
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Movie API');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer()).get('/movies').expect(200).expect([]);
    });

    it('POST 201', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: 'e2eTest', genres: ['e2e'], year: 2022 })
        .expect(201);
    });

    it('POST 400', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({
          title: 'e2eTest',
          genres: ['e2e'],
          year: 2022,
          badproperty: '400!',
        })
        .expect(400);
    });

    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies').expect(404);
    });
  });

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer()).get('/movies/1').expect(200);
    });
    it('PATCH', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: 'e2eUpdateTitle' })
        .expect(200);
    });
    it('DELETE', () => {
      return request(app.getHttpServer()).delete('/movies/1').expect(200);
    });
    // it.todo('DELETE');
    // it.todo('PATCH');
  });
});
