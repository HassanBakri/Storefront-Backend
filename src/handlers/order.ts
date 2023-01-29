import express, { Request, Response, Router } from 'express';
import { Order, OrderStore } from '../models/Orders';
import auth from '../middleware/Autherization';
import conf from '../hassanconfig';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const o = await store.index().catch((err: Error) => {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(o);
};

const show = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const o = await store.show(parseInt(_req.params.id)).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${show.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(o);
};
const destroy = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const deleted = await store.delete(parseInt(_req.params.id)).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${destroy.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(deleted);
};

const create = async (_req: Request, res: Response) => {
  const o: Order = {
    Id: 0,
    Total: 0,
    Status: 'active',
    CreateTime: new Date(),
    UserId: _req.currentUser.id,
  };
  const no = await store.Create(o).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${create.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(no);
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

  const po = await store.addProduct(quantity, userId, orderId, productId).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${addProduct.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(po);
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

  const po = await store.setProductCount(productId, quantity, orderId).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${setProductCount.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }); //userId
  res.json(po);
};
const getProduct = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id) || isNaN(parseInt(_req.params.id))) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const orderId: number = parseInt(_req.params.id);

  const po = await store.getProduct(orderId).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${getProduct.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.json(po);
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req: Request, res: Response) => {
  const productId: number = parseInt(_req.body.productId);
  //const quantity=_req.body.quantity;
  const orderId: number = parseInt(_req.body.orderId);

  if (!_req.body.productId || !_req.body.orderId || isNaN(_req.body.productId) || isNaN(_req.body.orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  await store.removeProduct(productId, orderId).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${removeProduct.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  res.status(200);
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req: Request, res: Response) => {
  console.log('checkout called');
  const orderId = parseInt(_req.body.orderId);
  if (!orderId || isNaN(orderId)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  console.log('passed validation');

  await store.checkout('checkedout', orderId).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${checkout.name} Endpoint`);
    console.log(err.message);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  });
  console.log('exiting checkout');
  res.status(200);
  res.json({});
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
