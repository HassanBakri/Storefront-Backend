import express, { Request, Response } from 'express';
import { Order,OrderProduct, OrderStore } from '../models/Orders';

const store = new OrderStore();

const index = async (_req: Request, res: Response) => {
    const Users = await store.index();
    res.json(Users);
  };
  
  const show = async (_req: Request, res: Response) => {
    const User = await store.show(_req.body.id);
    res.json(User);
  };
  const destroy = async (_req: Request, res: Response) => {
    const deleted = await store.delete(_req.body.id);
    res.json(deleted);
  };

  const create= async(_req: Request, res: Response) => {

  };

  const update= async(_req: Request, res: Response) => {
    
  };

  const Routes = (app: express.Application) => {
    app.get('/order', index);
    app.get('/order/{:id}', show);
    app.post('/order', create);
    //app.put('/product',update)
    app.delete('/product', destroy);
  };
  
  export default Routes;