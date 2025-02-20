import { useState, useEffect } from 'react';

export interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

export const useTasks = () => {
  const token = localStorage.getItem('token');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [updateTaskTitle, setUpdateTaskTitle] = useState('');
  const [updateTaskDescription, setUpdateTaskDescription] = useState('');
  const [error, setError] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load tasks');
    }
  };

  const createTask = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTaskTitle, description: newTaskDescription }),
      });
      if (res.ok) {
        setNewTaskTitle('');
        setNewTaskDescription('');
        fetchTasks();
      }
    } catch (err) {
      console.error(err);
      setError('Failed to create task');
    }
  };

  const updateTaskSetup = async (task: Task) => {
    setUpdateTaskTitle(task.title);
    setUpdateTaskDescription(task.description || '');
  }

  const updateTask = async (task: Task) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isComplete: task.isComplete, title: updateTaskTitle, description: updateTaskDescription }),
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id: number) => {
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
      setError('Failed to delete task');
    }
  };

  const completeTask = async (task: Task) => {
    try {
        await fetch(`${process.env.REACT_APP_API_URL}/tasks/${task.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isComplete: !task.isComplete, title: task.title, description: task.description }),
        });
        fetchTasks();
      } catch (err) {
        console.error(err);
        setError('Failed to update task');
      }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return {
    tasks,
    newTaskTitle,
    setNewTaskTitle,
    newTaskDescription,
    setNewTaskDescription,
    updateTaskTitle,
    setUpdateTaskTitle,
    updateTaskDescription,
    setUpdateTaskDescription,
    error,
    createTask,
    updateTask,
    updateTaskSetup,
    deleteTask,
    fetchTasks,
    completeTask,
  };
};
