import express, { Request, Response, Router } from 'express';
import { Category, Categorytore } from '../models/Category';
import auth from '../middleware/Autherization';
import conf from '../hassanconfig';

const store = new Categorytore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index().catch((err: Error) => {
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
  res.json(categories);
};

const show = async (_req: Request, res: Response) => {
  if (!parseInt(_req.params.id)) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  const category = await store.show(parseInt(_req.params.id)).catch((err: Error) => {
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
  res.json(category);
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
  const nc = await store.Create(c).catch((err: Error) => {
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
  res.json(nc);
}

const update = async (_req: Request, res: Response) => {
  const id = _req.body.id;
  const name = _req.body.name;
  const description = _req.body.description;
  const date = _req.body.date;
  const icon = _req.body.icon;
  console.log(!name , !description ,!icon ,!id)
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
  const nc = await store.Update(c).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${update.name} Endpoint`);
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
  res.json(nc);
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
