import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface AuthenticatedRequest extends Request {
  user?: any;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    res.sendStatus(401);
    return;
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || 'secret', (err, user) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    req.user = user;
    next();
  });
};