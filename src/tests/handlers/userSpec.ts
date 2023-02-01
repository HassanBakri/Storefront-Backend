import supertest from 'supertest';
import app from '../../server';

describe('Testing User EndPoints', () => {
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
    const user_reg_respones = await request.post("/users").set('Content-Type', 'application/json').send(user)
    auth_token += user_reg_respones.body;
   
    //console.log(user_reg_respones.body)
    expect(user_reg_respones.status).toBe(200);
    })
    it("Update User EndPoint",async () => {
        user.firstname="ali"
        const respones = await request.put("/users").set('Authorization', auth_token).set('Content-Type', 'application/json').set('Accept', 'application/json').send(user)
        console.log(user,respones.status,"\n","Response body\n",respones.body)
        expect(respones.body.FirstName).toEqual("ali")
    })

    it('Auth EndPoint', async () => {
        const user_auth = await request.post("/users/auth").set('Content-Type', 'application/json').send({ "username": "hassanbakriendpoint", "password": "123456" });
    
        expect(user_auth.status).toBe(200);
      });

    it('Index EndPoint', async () => {
        const response = await request.get('/users').set('Accept', 'application/json').expect('Content-Type', /json/);
    
        expect(response.status).toBe(200);
      });
    
      it('Show EndPoint', async () => {
        const response = await request.get('/users/1');
        expect(response.status).toBe(200);
      });
      it('Delete EndPoint', async () => {
        const response = await request.delete('/users/1').set('Authorization', auth_token);
        expect(response.status).toBe(200);
      });
})