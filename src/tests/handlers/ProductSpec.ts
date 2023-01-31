import supertest from 'supertest';
import app from '../../server';

describe('Testing Product EndPoints', () => {

    const category = {
        id:0,
        name: "smart home appliances",
        description: "smart home appliances",
        icon: "smart home appliances"
    }
    const user = {
        "id":0,
        "username": "hassanbakri3",
        "firstname": "Hassan",
        "lastname": "Bakri",
        "email": "hassanbakry3@gmail.com",
        "password": "123456",
        "phonenumber": "0533201601"
    }
    const product=
        {
            "id":0,
            "name": "Smart Phone",
            "description": "Smart Phone",
            "price": 1500,
            "categoryId": 0,
            "available_Items": 10
        }
    
    let auth_token = "Bearer "
    const request = supertest(app);
    it('Create EndPoint', async () => {

        const user_auth = await request.post("/users/auth").set('Content-Type', 'application/json').send({ "username": "hassanbakri", "password": "123456" });
        console.log("Auth Status :", user_auth.text)
        if (user_auth.statusCode != 200) {
            const user_reg_respones = (await request.post("/users").send(user).set('Content-Type', 'application/json'))
            auth_token += user_reg_respones.text.slice(1, -1);
        }
        else {
            auth_token += user_auth.text.slice(1, -1);
        }
        const response = await request.post('/category').set('Authorization', auth_token).set('Accept', 'application/json').send(category).expect('Content-Type', /json/);
        //console.log(response.body)
        product.categoryId=response.body.Id
        category.id=response.body.Id
        const product_response = await request.post('/product').set('Authorization', auth_token).set('Accept', 'application/json').send(product).expect('Content-Type', /json/);
        product.id=product_response.body.id

        expect(product_response.status).toBe(200);
    });
    it("Update EndPoint",async()=>{
        product.description="updateeddescription"
        const response = await request.put('/product').set('Authorization', auth_token).set('Accept', 'application/json').send(product).expect('Content-Type', /json/);
        console.log("Update EndPoint",response.body)
        expect(response.body.Description).toEqual("updateeddescription");
      })
    it('Index EndPoint', async () => {
        const response = await request.get('/product').set('Accept', 'application/json').expect('Content-Type', /json/);
    
        expect(response.status).toBe(200);
      });
    
      it('Show EndPoint', async () => {
        const response = await request.get('/product/1');
        expect(response.status).toBe(200);
      });
      it('Delete EndPoint', async () => {
        const response = await request.delete('/product/1').set('Authorization', auth_token);
        expect(response.status).toBe(200);
      });
})