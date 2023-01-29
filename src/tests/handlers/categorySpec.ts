import supertest from 'supertest';
import app from '../../server';

describe('Testing Categoty EndPoints', async () => {
  const request = supertest(app);
  it('Create EndPoint', async () => {
    const response = await (await request.post('/category')).body();
    expect(response.status).toBe(200);
  });
  it('Index EndPoint', async () => {
    const response = await request.get('/category');
    expect(response.status).toBe(200);
  });

  it('Show EndPoint', async () => {
    const response = await request.get('/category/1');
    expect(response.status).toBe(200);
  });
  it('Delete EndPoint', async () => {
    const response = await request.delete('/category/1');
    expect(response.status).toBe(200);
  });
});
