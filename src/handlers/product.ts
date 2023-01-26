import express, { Request, Response, Router } from 'express';
import { Product, ProductStore } from '../models/product';
import auth from '../middleware/Autherization';

const store = new ProductStore();

const index = async (_req: Request, res: Response) => {
  const p = await store.index();
  res.json(p);
};

const show = async (_req: Request, res: Response) => {
  const p = await store.show(parseInt(_req.params.id));
  res.json(p);
};
const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(parseInt(_req.params.id));
  res.json(deleted);
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
  const np = await store.Create(p);
  res.json(np);
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
  const np = await store.Update(p);
  res.json(np);
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
