import express, { Request, Response } from 'express';
import { Category, Categorytore } from '../models/Category';

const store = new Categorytore();

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
    app.get('/category', index);
    app.get('/category/{:id}', show);
    app.post('/category', create);
    app.put('/category',update)
    app.delete('/category', destroy);
  };
  
  export default Routes;