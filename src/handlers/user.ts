import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../hassanconfig';

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
  const Users = await store.index();
  res.json(Users);
};

const show = async (_req: Request, res: Response) => {
  const User = await store.show(_req.body.id);
  res.json(User);
};
const auth = async (_req: Request, res: Response) => {
  const User = await store.authenticate(_req.body.username, _req.body.password);
  const token = jwt.sign({ User: User }, config.JWTSECRIT as string);
  res.json(token);
};

const create = async (_req: Request, res: Response) => {
  try {
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User: User = {
      id: 0,
      FirstName: _req.body.firstname,
      LastName: _req.body.lastname,
      UserName: _req.body.username,
      Email: _req.body.email,
      PhoneNumber: _req.body.phnenumber,
      Password: _req.body.password,
    };

    const newUser = await store.create(User);
    const token = jwt.sign({ User: newUser }, config.JWTSECRIT as string);
    res.json(token);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};
const update = async (_req: Request, res: Response) => {
  try {
    console.log('Request Body\t' + _req.body + '\t' + _req.body.username);
    const User: User = {
      id: _req.body.id,
      FirstName: _req.body.firstname,
      LastName: _req.body.lastname,
      UserName: _req.body.username,
      Email: _req.body.email,
      PhoneNumber: _req.body.phnenumber,
      Password: _req.body.password,
    };

    const updatedUser = await store.Update(User);
    //const token = jwt.sign({ User: updatedUser }, config.JWTSECRIT as string);
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(400);
    res.json(err);
  }
};

const destroy = async (_req: Request, res: Response) => {
  const deleted = await store.delete(_req.body.id);
  res.json(deleted);
};

const UserRoutes = (app: express.Application) => {
  app.get('/users', index);
  app.get('/users/{:id}', show);
  app.post('/users/auth', auth);
  app.post('/users', create);
  app.put('/users', update);
  app.delete('/users', destroy);
};

export default UserRoutes;
