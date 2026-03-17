import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';

describe('PasswordController (e2e)', () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('password validation', () => {
    it('should return isValid true with empty failedRules for valid password', () => {
      return request(app.getHttpServer())
        .post('/passwords/validate')
        .send({ password: 'AbTp9!fok' })
        .expect(200)
        .expect({ isValid: true, failedRules: [] });
    });

    it.each([
      { password: 'ab', expected: false },
      { password: 'AAAbbbCc', expected: false },
      { password: 'AbTp9!foo', expected: false },
      { password: 'AbTp9!foA', expected: false },
      { password: 'AbTp9 fok', expected: false },
    ])(
      'should return isValid false with failedRules for "$password"',
      ({ password }) => {
        return request(app.getHttpServer())
          .post('/passwords/validate')
          .send({ password })
          .expect(200)
          .expect((res) => {
            const body = res.body as {
              isValid: boolean;
              failedRules: string[];
            };
            expect(body.isValid).toBe(false);
            expect(body.failedRules).toEqual(expect.any(Array));
            expect(body.failedRules.length).toBeGreaterThan(0);
          });
      },
    );
  });

  describe('individual rule violations', () => {
    it.each([
      { password: 'AbTp9!fo', rule: 'MinLength' },
      { password: 'AbTpq!fok', rule: 'HasDigit' },
      { password: 'ABTP9!FOK', rule: 'HasLowercase' },
      { password: 'abtp9!fok', rule: 'HasUppercase' },
      { password: 'AbTp9xfok', rule: 'HasSpecialChar' },
      { password: 'AbTp9!fof', rule: 'NoRepeatedChars' },
      { password: 'AbT\t9!fok', rule: 'NoWhitespace' },
    ])(
      'should include $rule in failedRules when violating it',
      ({ password, rule }) => {
        return request(app.getHttpServer())
          .post('/passwords/validate')
          .send({ password })
          .expect(200)
          .expect((res) => {
            const body = res.body as {
              isValid: boolean;
              failedRules: string[];
            };
            expect(body.isValid).toBe(false);
            expect(body.failedRules).toContain(rule);
          });
      },
    );
  });

  describe('invalid requests', () => {
    // Empty string ("") returns 400 (not 200 with isValid: false) because
    // @IsNotEmpty() in the DTO treats it as invalid input, not as a password
    // to be validated. This is a deliberate design choice — see README.
    it.each([
      { body: {}, desc: 'empty body' },
      { body: { password: '' }, desc: 'empty password' },
      { body: { password: 123 }, desc: 'numeric password' },
    ])('should return 400 for $desc', ({ body }) => {
      return request(app.getHttpServer())
        .post('/passwords/validate')
        .send(body)
        .expect(400);
    });

    it('should return 400 for missing body', () => {
      return request(app.getHttpServer())
        .post('/passwords/validate')
        .expect(400);
    });
  });
});
