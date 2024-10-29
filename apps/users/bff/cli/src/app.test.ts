import app from './app';

describe('GET /', () => {
  // Context
  describe('Given a Hono app with posts endpoint', () => {
    // Given - 前提条件
    describe('When making a GET request to /', () => {
      // When - 実行する操作
      let response: Response;

      beforeEach(async () => {
        response = await app.request('/');
      });

      it('Then should return status 200', () => {
        // Then - 期待する結果
        expect(response.status).toBe(200);
      });

      it('Then should return "Many posts" as text', async () => {
        // Then - 期待する結果
        expect(await response.text()).toBe('Hello Hono!');
      });
    });
  });
});
