import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import tasksRoutes from './routes/tasks.routes';

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.CORS_ADDRESS }));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/tasks', tasksRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});