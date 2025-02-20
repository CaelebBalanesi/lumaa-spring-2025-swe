import { pool } from './db';

export interface User {
    id: number;
    username: string;
    password: string;
  }
  
  export async function createUser(username: string, hashedPassword: string): Promise<User> {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [username, hashedPassword]
    );
    return result.rows[0];
  }
  
  export async function findUserByUsername(username: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1',
      [username]
    );
    return result.rows[0] || null;
  }
  
  export async function findUserById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }