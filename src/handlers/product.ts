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
    const Id=0;
    const Name=_req.body.name;
    const Description=_req.body.description;
    const Price=_req.body.price;
    const CreateTime=new Date();
    const CreatedBy=0;
    const CategoryId=_req.body.categoryId;
    const Available_Items=_req.body.available_Items;

    const p:Product={
      Id:Id,
      Name:Name,
      Description:Description,
      Price:Price,
      CreateTime:CreateTime,
      CreatedBy:CreatedBy,
      CategoryId:CategoryId,
      Available_Items:Available_Items,
    }
    const np=store.Create(p)
    res.json(np)
  };

  const update= async(_req: Request, res: Response) => {
    const Id=_req.body.id;
    const Name=_req.body.name;
    const Description=_req.body.description;
    const Price=_req.body.price;
    const CreateTime=new Date();
    const CreatedBy=0;
    const CategoryId=_req.body.categoryId;
    const Available_Items=_req.body.available_Items;

    const p:Product={
      Id:Id,
      Name:Name,
      Description:Description,
      Price:Price,
      CreateTime:CreateTime,
      CreatedBy:CreatedBy,
      CategoryId:CategoryId,
      Available_Items:Available_Items,
    }
    const np=store.Create(p)
    res.json(np)
  };

  const Routes = (app: express.Application) => {
    app.get('/product', index);
    app.get('/product/{:id}', show);
    app.post('/product', create);
    app.put('/product',update)
    app.delete('/product', destroy);
  };
  
  export default Routes;