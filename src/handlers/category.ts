import express, { Request, Response, Router } from 'express';
import { Category, Categorytore } from '../models/Category';
import auth from '../middleware/Autherization';

//const routes = express.Router();

const store = new Categorytore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index();
  res.json(categories);
};

const show = async (_req: Request, res: Response) => {
  const category = await store.show(parseInt(_req.params.id));
  res.json(category);
};
const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(parseInt(_req.params.id));
  res.json(deleted);
};

async function create(_req: Request, res: Response): Promise<void> {
  const name = _req.body.name;
  const description = _req.body.description;
  const icon = _req.body.icon;
  //console.log(_req.currentUser)
  const c: Category = {
    Id: 0,
    Name: name,
    Description: description,
    CreateTime: new Date(),
    icon: icon,
    CreatedBy: _req.currentUser.id,
  };
  const nc = await store.Create(c);
  res.json(nc);
}

const update = async (_req: Request, res: Response) => {
  const id = _req.body.id;
  const name = _req.body.name;
  const description = _req.body.description;
  const date = _req.body.date;
  const icon = _req.body.icon;

  const c: Category = {
    Id: id,
    Name: name,
    Description: description,
    CreateTime: new Date(Date.parse(date)),
    icon: icon,
    CreatedBy: 0,
  };
  const nc = await store.Update(c);
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
  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJIYXNzYW4iLCJsYXN0bmFtZSI6ImFsbWFra2kiLCJlbWFpbCI6Imhhc3NhbmJha3J5QGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJDNmd0JtbTQ2OU5jVFJFQkhNQmNwMi5wYkhKVHNMSUwwR1FKekNsSTVmdFRrN3hnSTdhLkEyIiwiY3JlYXRlZGF0ZSI6IjIwMjMtMDEtMjRUMTU6Mzk6MTMuODE5WiIsInVzZXJuYW1lIjoiaGFzc2FuYmFrcmkiLCJwaG9uZW51bWJlciI6IjA1MzMyMDE2MDEifSwiaWF0IjoxNjc0NTk5MDEzfQ.gEEal5W_95Qd4NDp2GaJZYuqeZkOh4TjU5cL-XmOtRI
};

export default Routes;
