import express, { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const store = new ProductStore();

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
    app.get('/product', index);
    app.get('/product/{:id}', show);
    app.post('/product', create);
    app.put('/product',update)
    app.delete('/product', destroy);
  };
  
  export default Routes;