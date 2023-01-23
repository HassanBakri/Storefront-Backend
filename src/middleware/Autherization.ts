import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from '../hassanconfig';

exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization: String = req.headers.authorization as string;
    if (authorization == null || authorization == undefined) {
      res.status(401).json({
        error: new Error('Invalid request!'),
      });
    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.JWTSECRIT as string);
    console.log(decodedToken);
    //const userId = decodedToken.userId;
    //if (req.body.userId && req.body.userId !== decodedToken. userId) {
    //throw 'Invalid user ID';
    //} else {
    next();
    //}
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
