import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware setup
app.use(cors());
app.use(express.json());

// GET all tasks
app.get('/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await prisma.task.findMany();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// GET a specific task by ID
app.get('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error fetching task' });
  }
});

// POST create a new task
app.post('/tasks', async (req: Request, res: Response) => {
  const { title, color, completed } = req.body;
  try {
    const newTask = await prisma.task.create({
      data: {
        title,
        color,
        completed,
      },
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

// PUT update a task by ID
app.put('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;
  try {
    const updatedTask = await prisma.task.update({
      where: {
        id: parseInt(id),
      },
      data: {
        title,
        color,
        completed,
      },
    });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
});

// DELETE a task by ID
app.delete('/tasks/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
});

// Server setup
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});