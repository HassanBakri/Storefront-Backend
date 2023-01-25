import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../hassanconfig';
import { User } from '../models/user';

export interface TokenInterface {
  User: User,
 iat:number
}
const validateToken = (request: Request, response: Response, next: NextFunction) => {
    try {
    const authorization: String = request.headers.authorization as string;
    console.log(authorization)
    if (authorization == null || authorization == undefined) {
      response.status(401).json({
        error: new Error('Invalid request!'),
      });
      return
    }
    const token = authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, config.JWTSECRIT as string);
    console.log("verified token"+decodedToken);
    const dt=jwt.decode(token) 
    //const cu=(decodedToken as TokenInterface).user;
    console.log("decoded token ",dt);
    request.currentUser=(dt as TokenInterface).User;
    //request.currentUser=
    //const userId = decodedToken.userId;
    //if (req.body.userId && req.body.userId !== decodedToken. userId) {
    //throw 'Invalid user ID';
    //} else {
    next();
    //}
  } catch {
    console.log("Eror happend")
    response.status(401).json({
      error: new Error('Invalid request!'),
    });
  }
};
 export default validateToken