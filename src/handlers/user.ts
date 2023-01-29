import express, { Request, Response, Router } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import conf from '../hassanconfig';

const store = new UserStore();
//const r=express.Router();
const index = async (_req: Request, res: Response) => {

  const Users = await store.index().catch((err: Error) => {
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
  res.json(Users);
};

const show = async (_req: Request, res: Response) => {
  if(!parseInt(_req.params.id)){
    res.status(400)
    res.json({"status":" improper request "})
    return
  }
  const User = await store.show(parseInt(_req.params.id)).catch((err: Error) => {
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
  res.json(User);
};
const auth = async (_req: Request, res: Response) => {
  if(!_req.body.username||!_req.body.password){
    res.status(400)
    res.json({"status":" improper request "})
    return
  }
  const User = await store.authenticate(_req.body.username, _req.body.password).catch((err: Error) => {
    console.log(`Error in ${__filename} in ${auth.name} Endpoint`);
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
  const token = jwt.sign({ User: User }, conf.JWTSECRIT as string);
  res.json(token);
};

const create = async (_req: Request, res: Response) => {
  if(!_req.params.firstname||!_req.params.lastname||!_req.params.username||!_req.params.email||!_req.params.phonenumber||!_req.params.password){
    res.status(400)
    res.json({"status":" improper request "})
    return
  }
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User: User = {
      id: 0,
      FirstName: _req.body.firstname,
      LastName: _req.body.lastname,
      UserName: _req.body.username,
      Email: _req.body.email,
      PhoneNumber: _req.body.phonenumber,
      Password: _req.body.password,
    };

    const newUser = await store.create(User).catch((err: Error) => {
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
    try {
    const token = jwt.sign({ User: newUser }, conf.JWTSECRIT as string);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const update = async (_req: Request, res: Response) => {
  if(!_req.body.id||!_req.body.firstname||!_req.body.lastname||!_req.body.username||!_req.body.email||!_req.body.phonenumber||!_req.body.password){
    res.status(400)
    res.json({"status":" improper request "})
    return
  }
 
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User: User = {
      id: _req.body.id,
      FirstName: _req.body.firstname,
      LastName: _req.body.lastname,
      UserName: _req.body.username,
      Email: _req.body.email,
      PhoneNumber: _req.body.phonenumber,
      Password: _req.body.password,
    };

    const updatedUser = await store.Update(User).catch((err: Error) => {
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
    res.json(updatedUser);
 
};

const destroy = async (_req: Request, res: Response) => {
  if(!parseInt(_req.params.id)){
    res.status(400)
    res.json({"status":" improper request "})
    return
  }
  const deleted = await store.delete(_req.params.id).catch((err: Error) => {
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

const UserRoutes = Router();

const Routes = (app: express.Application) => {
  UserRoutes.route('/users').get(index);
  UserRoutes.route('/users/:id').get(show);
  UserRoutes.route('/users/auth').post(auth);
  UserRoutes.route('/users').post(create);
  UserRoutes.route('/users').put(auth, update);
  UserRoutes.route('/users/:id').delete(auth, destroy);
  app.use(UserRoutes);
};

export default Routes;
