import app from './app';

describe('GET /', () => {
  describe('Given a Hono app with posts endpoint', () => {
    describe('When making a GET request to /', () => {
      let response: Response;

      beforeEach(async () => {
        response = await app.request('/');
      });

      it('Then should return status 200', () => {
        expect(response.status).toBe(200);
      });

      it('Then should return "Many posts" as text', async () => {
        expect(await response.text()).toBe('Hello Hono!');
      });
    });
  });
});
