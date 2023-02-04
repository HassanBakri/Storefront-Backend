import express, { Request, Response, Router } from 'express';
import { Order, OrderStore } from '../models/Orders';
import auth from '../middleware/Autherization';
import conf from '../hassanconfig';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  try {
  const o = await store.index()
  res.json(o);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};

const show = async (_req: Request, res: Response) => {

  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  try {
  const o = await store.show(parseInt(_req.params.id))
   res.json(o);
  }catch(err:unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if(err instanceof (Error))
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else
      res.json({ status: 'faild', ErrorDetails:err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
 
}
const destroy = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  try {
  const deleted = await store.delete(parseInt(_req.params.id))
   res.json(deleted);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
 
};

const create = async (_req: Request, res: Response) => {
  const o: Order = {
    Id: 0,
    Total: 0,
    Status: 'active',
    CreateTime: new Date(),
    UserId: _req.currentUser.id,
  };
  try {
  const no = await store.Create(o)
   res.json(no);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};

const addProduct = async (_req: Request, res: Response) => {
  const productId: number = _req.body.productId as number;
  const quantity: number = _req.body.quantity as number;
  const orderId: number = _req.body.orderId as number;
  const userId: number = _req.currentUser.id as number;

  if (!_req.body.productId || !_req.body.quantity || !_req.body.orderId || isNaN(orderId) || isNaN(quantity) || isNaN(orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  try {
  const po = await store.addProduct(quantity, userId, orderId, productId)
  res.json(po);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
const setProductCount = async (_req: Request, res: Response) => {
  const productId = _req.body.productId;
  const quantity = _req.body.quantity;
  const orderId = _req.body.orderId;

  if (!_req.body.productId || !_req.body.quantity || !_req.body.orderId || isNaN(productId) || isNaN(quantity) || isNaN(orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  try {
  const po = await store.setProductCount(productId, quantity, orderId)
  
  res.json(po);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};
const getProduct = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id) || isNaN(parseInt(_req.params.id))) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const orderId: number = parseInt(_req.params.id);
  try {
  const po = await store.getProduct(orderId);
  res.json(po);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req: Request, res: Response) => {
  const productId: number = parseInt(_req.body.productId);
  //const quantity=_req.body.quantity;
  const orderId: number = parseInt(_req.body.orderId);
  console.log('Start remove product Function');
  if (!_req.body.productId || !_req.body.orderId || isNaN(_req.body.productId) || isNaN(_req.body.orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  console.log('passed validation');
  try {
  await store.removeProduct(productId, orderId)
  res.status(200);
  res.json({})
  console.log("returning from model and status sent")
  return;
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }

}
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req: Request, res: Response) => {
  //console.log('checkout called');
  const orderId = parseInt(_req.body.orderId);
  if (!orderId || isNaN(orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  //console.log('passed validation');
  try {
  await store.checkout('checkedout', orderId)
   console.log('exiting checkout');
  res.status(200);
  res.json({});
}catch(err:unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if(err instanceof (Error))
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else
      res.json({ status: 'faild', ErrorDetails:err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
 
};
const OrderRoutes = Router();

const Routes = (app: express.Application) => {
  OrderRoutes.route('/order').get(index);
  OrderRoutes.route('/order/:id').get(show);
  OrderRoutes.route('/order').post(auth, create);
  OrderRoutes.route('/order/:id').delete(auth, destroy);

  OrderRoutes.route('/order/addProduct').post(auth, addProduct);
  OrderRoutes.route('/order/:id/getProducts').get(auth, getProduct);
  OrderRoutes.route('/order/setProductCount').post(setProductCount);
  OrderRoutes.route('/order/removeProduct').post(auth, removeProduct);
  OrderRoutes.route('/order/checkout').post(auth, checkout);

  app.use(OrderRoutes);
};

export default Routes;
