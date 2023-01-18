import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt from 'jsonwebtoken';
//import dotenv from 'dotenv';

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
  const token = jwt.sign({ User: User }, process.env.JWTSECRIT as string);
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
    const token = jwt.sign({ User: newUser }, process.env.JWTSECRIT as string);
    res.json(token);
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
  app.delete('/users', destroy);
};

export default UserRoutes;
