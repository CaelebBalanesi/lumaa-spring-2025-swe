import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { createUser, findUserByUsername } from '../models/userModel';
import dotenv from 'dotenv';
dotenv.config();

const jwtSecret = process.env.JWT_SECRET || 'secret';
const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || '10');

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;
  try {
    const existingUser = await findUserByUsername(username);
    if (existingUser) {
      res.status(400).json({ error: 'Username already exists' });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await createUser(username, hashedPassword);
    res.status(201).json({ id: user.id, username: user.username });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { username, password } = req.body;
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      res.status(400).json({ error: 'Invalid credentials' });
      return;
    }
    const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }
};