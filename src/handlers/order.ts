import express, { Request, Response, Router } from 'express';
import { Order, OrderProduct, OrderStore } from '../models/Orders';
import auth from '../middleware/Autherization';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
  const o = await store.index();
  res.json(o);
};

const show = async (_req: Request, res: Response) => {
  const o = await store.show(parseInt(_req.params.id));
  res.json(o);
};
const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(parseInt(_req.params.id));
  res.json(deleted);
};

const create = async (_req: Request, res: Response) => {
  // const Total = _req.body.total;
  // const Status = _req.body.status;
  // //const CreateTime = _req.body.createTime;
  // const UserId = _req.currentUser.id;

  const o: Order = {
    Id: 0,
    Total: 0,
    Status: 'active',
    CreateTime: new Date(),
    UserId: _req.currentUser.id,
  };
  const no = await store.Create(o);
  res.json(no);
};

//   const update= async(_req: Request, res: Response) => {
//   };
//  async addProduct(quantity: number,userId:string, orderId: string, productId: string): Promise<Order> {
const addProduct = async (_req: Request, res: Response) => {
  const productId: number = _req.body.productId as number;
  const quantity: number = _req.body.quantity as number;
  const orderId: number = _req.body.orderId as number;
  const userId: number = _req.currentUser.id as number;

  const po: OrderProduct = await store.addProduct(quantity, userId, orderId, productId);
  res.json(po);
};
//  async setProductCount (productId:number,count:number,orderId:number): Promise<void> {
const setProductCount = async (_req: Request, res: Response) => {
  const productId = _req.body.productId;
  const quantity = _req.body.quantity;
  const orderId = _req.body.orderId;
  //const userId=_req.body.userId;

  const po = await store.setProductCount(productId, quantity, orderId); //userId
  res.json(po);
};
const getProduct = async (_req: Request, res: Response) => {
  const orderId: number = parseInt(_req.params.id);
  //const userId=_req.body.userId;

  const po = await store.getProduct(orderId); //userId
  res.json(po);
};
//  async removeProduct (productId:number,orderId:number): Promise<void> {
const removeProduct = async (_req: Request, res: Response) => {
  const productId: number = parseInt(_req.body.productId);
  //const quantity=_req.body.quantity;
  const orderId: number = parseInt(_req.body.orderId);

  await store.removeProduct(productId, orderId);
  res.status(200);
};
//  async checkout (status:string,orderId:number): Promise<void> {
const checkout = async (_req: Request, res: Response) => {
  const orderId = _req.body.orderId;
  store.checkout('checkedout', orderId);
  res.status(200);
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
