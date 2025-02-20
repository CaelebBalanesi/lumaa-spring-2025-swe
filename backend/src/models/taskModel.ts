import { pool } from './db';

export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
  userId: number;
}

export async function getTasksByUserId(userId: number): Promise<Task[]> {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE "userId" = $1',
    [userId]
  );
  return result.rows;
}

export async function createTask(userId: number, title: string, description?: string): Promise<Task> {
  const result = await pool.query(
    'INSERT INTO tasks (title, description, "userId") VALUES ($1, $2, $3) RETURNING *',
    [title, description || null, userId]
  );
  return result.rows[0];
}

export async function updateTask(taskId: number, userId: number, title?: string, description?: string, isComplete?: boolean): Promise<Task | null> {
  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         "isComplete" = COALESCE($3, "isComplete")
     WHERE id = $4 AND "userId" = $5
     RETURNING *`,
    [title, description, isComplete, taskId, userId]
  );
  return result.rows[0] || null;
}

export async function deleteTask(taskId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND "userId" = $2 RETURNING *',
    [taskId, userId]
  );
  return (result.rowCount ?? 0) > 0;
}