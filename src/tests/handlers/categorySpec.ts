import supertest from 'supertest';
import app from '../../server';

describe('Testing Categoty EndPoints', () => {
  const category = {
    id: 0,
    name: 'smart home appliances',
    description: 'smart home appliances',
    icon: 'smart home appliances',
  };
  const user = {
    username: 'hassanbakri4',
    firstname: 'Hassan',
    lastname: 'Bakri',
    email: 'hassanbakry4@gmail.com',
    password: '123456',
    phonenumber: '0533201601',
  };
  let auth_token = 'Bearer ';
  const request = supertest(app);

  it('Create EndPoint', async () => {
    const user_auth = await request.post('/users/auth').set('Content-Type', 'application/json').send({ username: 'hassanbakri', password: '123456' });
    console.log('Auth Status :', user_auth.text);
    if (user_auth.statusCode != 200) {
      const user_reg_respones = await request.post('/users').send(user).set('Content-Type', 'application/json');
      auth_token += user_reg_respones.text.slice(1, -1);
    } else {
      auth_token += user_auth.text.slice(1, -1);
    }
    //console.log(user_reg_respones)
    const response = await request.post('/category').set('Authorization', auth_token).set('Accept', 'application/json').send(category).expect('Content-Type', /json/);
    category.id = response.body.Id;
    expect(response.status).toBe(200);
  });
  it('Update EndPoint', async () => {
    category.description = 'updateeddescription';
    const response = await request.put('/category').set('Authorization', auth_token).set('Accept', 'application/json').send(category).expect('Content-Type', /json/);
    console.log('Update EndPoint', response.body);
    expect(response.body.Description).toEqual('updateeddescription');
  });
  it('Index EndPoint', async () => {
    const response = await request.get('/category').set('Accept', 'application/json').expect('Content-Type', /json/);

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
