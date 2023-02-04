import express, { Request, Response, Router } from 'express';
import { Product, ProductStore } from '../models/product';
import auth from '../middleware/Autherization';
import conf from '../hassanconfig';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  try {
    const p = await store.index();
    res.json(p);
  } catch (err: unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if (err instanceof Error) res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else res.json({ status: 'faild', ErrorDetails: err });
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
    const p = await store.show(parseInt(_req.params.id));
    res.json(p);
  } catch (err: unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if (err instanceof Error) res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else res.json({ status: 'faild', ErrorDetails: err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
};
const destroy = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  try {
    const deleted = await store.delete(parseInt(_req.params.id));
    res.json(deleted);
  } catch (err: unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if (err instanceof Error) res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else res.json({ status: 'faild', ErrorDetails: err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
};

const create = async (_req: Request, res: Response) => {
  const Id = 0;
  const Name = _req.body.name;
  const Description = _req.body.description;
  const Price = _req.body.price;
  const CreateTime = new Date();
  const CreatedBy = _req.currentUser.id;
  const CategoryId = _req.body.categoryId;
  const Available_Items = _req.body.available_Items;
  console.log('req body', _req.body);
  console.log(!Name, !Description, isNaN(Price), isNaN(CategoryId), !Available_Items, !Price, !CategoryId);
  if (!Name || !Description || isNaN(Price) || isNaN(CategoryId) || !Available_Items || !Price || !CategoryId) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const p: Product = {
    Id: Id,
    Name: Name,
    Description: Description,
    Price: Price,
    CreateTime: CreateTime,
    CreatedBy: CreatedBy,
    CategoryId: CategoryId,
    Available_Items: Available_Items,
  };
  try {
    const np = await store.Create(p);
    res.json(np);
  } catch (err: unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if (err instanceof Error) res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else res.json({ status: 'faild', ErrorDetails: err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
};

const update = async (_req: Request, res: Response) => {
  const Id = _req.body.id;
  const Name = _req.body.name;
  const Description = _req.body.description;
  const Price = _req.body.price;
  const CreateTime = new Date();
  const CreatedBy = _req.currentUser.id;
  const CategoryId = _req.body.categoryId;
  const Available_Items = _req.body.available_Items;

  if (!Name || !Description || isNaN(Price) || isNaN(Id) || isNaN(CategoryId) || !Available_Items || !Price || !Id || !CategoryId) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }

  const p: Product = {
    Id: Id,
    Name: Name,
    Description: Description,
    Price: Price,
    CreateTime: CreateTime,
    CreatedBy: CreatedBy,
    CategoryId: CategoryId,
    Available_Items: Available_Items,
  };
  try {
    const np = await store.Update(p);

    res.json(np);
  } catch (err: unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if (err instanceof Error) res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else res.json({ status: 'faild', ErrorDetails: err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
};
const ProductRoutes = Router();
const Routes = (app: express.Application) => {
  ProductRoutes.route('/product').get(index);
  ProductRoutes.route('/product/:id').get(show);
  ProductRoutes.route('/product').post(auth, create);
  ProductRoutes.route('/product').put(auth, update);
  ProductRoutes.route('/product/:id').delete(auth, destroy);
  app.use(ProductRoutes);
};

export default Routes;
