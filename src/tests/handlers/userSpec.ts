import supertest from 'supertest';
import app from '../../server';

describe('Testing Product EndPoints', () => {
    const request = supertest(app);
    let auth_token = "Bearer "
    const user = {
        "id":0,
        "username"  : "hassanbakriendpoint",
        "firstname" : "Hassan",
        "lastname"  : "Bakri",
        "email"     : "hassanbakryendpoint@gmail.com",
        "password"  : "123456",
        "phonenumber": "0533201601"
    }
    it('Create EndPoint', async () => {
    const user_reg_respones = (await request.post("/users").send(user).set('Content-Type', 'application/json'))
    auth_token += user_reg_respones.text.slice(1, -1);
    expect(user_reg_respones.status).toBe(200);

    })
})