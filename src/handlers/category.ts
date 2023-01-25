import express, { Request, Response,Router ,Express } from 'express';
import { Category, Categorytore } from '../models/Category';
import auth from '../middleware/Autherization'

const routes = express.Router();


const store = new Categorytore();

const index = async (_req: Request, res: Response) => {
  const categories = await store.index();
  res.json(categories);
};

const show = async (_req: Request, res: Response) => {
  const User = await store.show(_req.body.id);
  res.json(User);
};
const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
};

 async function create(_req: Request, res: Response):Promise<void>{
  const name = _req.body.name;
  const description = _req.body.description;
  const icon = _req.body.icon;

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
};

const update = async (_req: Request, res: Response) => {
  const id = _req.body.id;
  const name = _req.body.Name;
  const description = _req.body.Description;
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
  CategoryRoutes.route('/category',).get( index);
  CategoryRoutes.route('/category/{:id}', ).get(show);     
  CategoryRoutes.route('/category',).put( update);
  CategoryRoutes.route('/category', ).delete(destroy);
  CategoryRoutes.route('/category').post(auth,create);
  app.use(CategoryRoutes)
 
};

export default Routes;
