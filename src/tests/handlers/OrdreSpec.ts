import supertest from 'supertest';
import { Order ,OrderProduct} from '../../models/Orders';
import app from '../../server';

describe('Testing Oder EndPoints', () => {
    const request = supertest(app);
    let auth_token = "Bearer "
    const user = {
        "id":0,
        "username"  : "hassanbakri9999",
        "firstname" : "Hassan",
        "lastname"  : "Bakri",
        "email"     : "hassanbakry9999@gmail.com",
        "password"  : "123456",
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
        const category = {
            id:0,
            name: 'smart home appliances',
            description: 'smart home appliances',
            icon: 'smart home appliances',
          };
         const productOrder= {
            "productId": 0,
            "quantity": 3,
            "orderId": 0
          
        }
    let Order:Order;

    it('Create EndPoint', async () => {

        const user_auth = await request.post("/users/auth").set('Content-Type', 'application/json').send({ "username": "hassanbakri9999", "password": "123456" });
        console.log("Auth Status :", user_auth.text)
        if (user_auth.statusCode != 200) {
            const user_reg_respones = (await request.post("/users").send(user).set('Content-Type', 'application/json'))
            auth_token += user_reg_respones.text.slice(1, -1);
        }
        else {
            auth_token += user_auth.text.slice(1, -1);
        }

        const createOrder= await request.post('/order').set('Authorization', auth_token);
        Order=createOrder.body
        console.log("Created Order",Order)
        expect(createOrder.status).toBe(200)
    })
    it('Index EndPoint', async () => {
        const response = await request.get('/order').set('Accept', 'application/json').expect('Content-Type', /json/);
    
        expect(response.status).toBe(200);
      });
    
      it('Show EndPoint', async () => {
        const response = await request.get('/order/1');
        expect(response.status).toBe(200);
      });

      it('Add Product Order EndPoint', async () => {
        const response = await request.post('/category').set('Authorization', auth_token).set('Accept', 'application/json').send(category).expect('Content-Type', /json/);
        //console.log(response.body)
        product.categoryId=response.body.Id
        category.id=response.body.Id
        const product_response = await request.post('/product').set('Authorization', auth_token).set('Accept', 'application/json').send(product).expect('Content-Type', /json/);
        product.id=product_response.body.id
        
        productOrder.orderId=Order.Id
        productOrder.productId=product.id
        const response1 = await request.post('/order/addProduct').set('Authorization', auth_token).send(productOrder);
        expect(response1.status).toBe(200);
      });
      /**
       * '/order/:id/getProducts
'/order/setProductCount').post
'/order/removeProduct').post
'/order/checkout').post
       */
it('Get Order Products EndPoint', async () => {
    const response = await request.get('/order/1/getProducts').set('Authorization', auth_token);
    expect(response.status).toBe(200);
  });

  it('Set Order Product Count EndPoint', async () => {
    const response = await request.post('/order/setProductCount').send({
        "productId": product.id,
        "quantity":8,
        "orderId": Order.Id
      
    })
    expect(response.status).toBe(200);
  });

  it('Delete Order Product EndPoint', async () => {
    const data={
        "productId": product.id,
        "orderId": Order.Id 
    }
    console.log(data)
    const response = await request.post('/order/removeProduct').set('Authorization', auth_token).send(data);
    expect(response.status).toBe(200);
  });

  it('Checkout Order EndPoint', async () => {
    const response = await request.post('/order/checkout').set('Authorization', auth_token).send({"orderId":Order.Id});
    expect(response.status).toBe(200);
  });
      it('Delete Order EndPoint', async () => {
        const response = await request.delete('/order/1').set('Authorization', auth_token);
        expect(response.status).toBe(200);
      });
})