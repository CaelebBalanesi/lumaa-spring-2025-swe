import { Request, Response, NextFunction } from 'express';
import { getTasksByUserId, createTask as createTaskModel, updateTask as updateTaskModel, deleteTask as deleteTaskModel } from '../models/taskModel';
import { AuthenticatedRequest } from '../middlewares/auth.middleware';

export const getTasks = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const tasks = await getTasksByUserId(req.user.id);
    res.json(tasks);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const createTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { title, description } = req.body;
  try {
    const newTask = await createTaskModel(req.user.id, title, description);
    res.status(201).json(newTask);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const updateTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  const { title, description, isComplete } = req.body;
  try {
    const updatedTask = await updateTaskModel(parseInt(id), req.user.id, title, description, isComplete);
    if (!updatedTask) {
      res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const deleteTask = async (req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;
  try {
    const success = await deleteTaskModel(parseInt(id), req.user.id);
    if (!success) {
      res.status(404).json({ error: 'Task not found or unauthorized' });
      return;
    }
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
