import express, { Request, Response, Router } from 'express';
import { Category, Categorytore } from '../models/Category';
import auth from '../middleware/Autherization';
import conf from '../hassanconfig';

const store = new Categorytore();

const index = async (_req: Request, res: Response) => {
  try {
    const categories = await store.index();
    res.json(categories);
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
    const category = await store.show(parseInt(_req.params.id));
    res.json(category);
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

async function create(_req: Request, res: Response): Promise<void> {
  const name = _req.body.name;
  const description = _req.body.description;
  const icon = _req.body.icon;
  console.log('this is create category', name, description, icon);
  if (!name || !description || !icon) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }

  const c: Category = {
    Id: 0,
    Name: name,
    Description: description,
    CreateTime: new Date(),
    icon: icon,
    CreatedBy: _req.currentUser.id,
  };
  try {
    const nc = await store.Create(c);
    res.json(nc);
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
}

const update = async (_req: Request, res: Response) => {
  const id = _req.body.id;
  const name = _req.body.name;
  const description = _req.body.description;
  const date = _req.body.date;
  const icon = _req.body.icon;
  console.log(!name, !description, !icon, !id);
  if (!name || !description || !icon || !id) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const c: Category = {
    Id: id,
    Name: name,
    Description: description,
    CreateTime: new Date(Date.parse(date)),
    icon: icon,
    CreatedBy: 0,
  };
  try {
    const nc = await store.Update(c);
    res.json(nc);
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

const CategoryRoutes = Router();

const Routes = (app: express.Application) => {
  CategoryRoutes.route('/category').get(index);
  CategoryRoutes.route('/category/:id').get(show);
  CategoryRoutes.route('/category').put(update);
  CategoryRoutes.route('/category/:id').delete(destroy);
  CategoryRoutes.route('/category').post(auth, create);
  app.use(CategoryRoutes);
};

export default Routes;
