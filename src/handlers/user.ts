import express, { Request, Response, Router } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import conf from '../hassanconfig';
import authmd from '../middleware/Autherization';

const store = new UserStore();
//const r=express.Router();
const index = async (_req: Request, res: Response) => {
  try {
  const Users = await store.index()
  res.json(Users);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
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
  const User = await store.show(parseInt(_req.params.id))
  res.json(User);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};
const auth = async (_req: Request, res: Response) => {
  if (!_req.body.username || !_req.body.password) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
  }
  
  try {
  const User= await store.authenticate(_req.body.username, _req.body.password) 
  
  if (User) {
    const token = jwt.sign({ User: User }, conf.JWTSECRIT as string);
    res.json(token);
  } else {
    res.status(400);
    res.json({ status: ' invalid username/password' });
  }
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
  
};

const create = async (_req: Request, res: Response) => {
  if (!_req.body.firstname || !_req.body.lastname || !_req.body.username || !_req.body.email || !_req.body.phonenumber || !_req.body.password) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
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
  let newUser:User;
  try {
   newUser= await store.create(User)
}catch(err:unknown) {
    console.log(`Error in ${__filename} in ${index.name} Endpoint`);
    console.log(err);
    res.status(500);
    if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
      if(err instanceof (Error))
      res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
      else
      res.json({ status: 'faild', ErrorDetails:err });
      return;
    } else {
      res.json({ status: 'faild' });
      return;
    }
  }
  try {
    if (res.headersSent) return;
    const token = jwt.sign({ User: newUser }, conf.JWTSECRIT as string);
    console.log('token ::', token);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const update = async (_req: Request, res: Response) => {
  console.log('Entring Update Endpoint------------------------------------');
  //  if (!_req.body.id || !_req.body.firstname || !_req.body.lastname || !_req.body.username || !_req.body.email || !_req.body.phonenumber || !_req.body.password) {
  console.log('Update EndPoint', _req.body.id, _req.body.firstname, _req.body.lastname, _req.body.username, _req.body.email, _req.body.phonenumber, _req.body.password);

  if (!_req.body.firstname || !_req.body.lastname || !_req.body.username || !_req.body.email || !_req.body.phonenumber || !_req.body.password) {
    res.status(400);
    res.json({ status: ' improper request ' });
    return;
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
  try {
  const updatedUser = await store.Update(User)
  res.json(updatedUser);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
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
  const deleted = await store.delete(_req.params.id)
  res.json(deleted);
}catch(err:unknown) {
  console.log(`Error in ${__filename} in ${index.name} Endpoint`);
  console.log(err);
  res.status(500);
  if (conf.ENV?.trim() === 'dev' || conf.ENV?.trim() === 'test') {
    if(err instanceof (Error))
    res.json({ status: 'faild', ErrorDetails: { name: err.name, message: err.message, stack: err.stack } });
    else
    res.json({ status: 'faild', ErrorDetails:err });
    return;
  } else {
    res.json({ status: 'faild' });
    return;
  }
}
};

const UserRoutes = Router();

const Routes = (app: express.Application) => {
  UserRoutes.route('/users').get(index);
  UserRoutes.route('/users/:id').get(show);
  UserRoutes.route('/users/auth').post(auth);
  UserRoutes.route('/users').post(create);
  UserRoutes.route('/users').put(authmd, update);
  UserRoutes.route('/users/:id').delete(authmd, destroy);
  app.use(UserRoutes);
};

export default Routes;
