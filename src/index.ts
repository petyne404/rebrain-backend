import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors'

// Import routes (ต้อง export แบบ ES Module หรือใช้ default export)
import userRoute from './routes/user.route';
import timeCounterRoute from './routes/timeCounter.route';
import authMiddleware from './middlewares/auth';

const app = express();

const allowedOrigins = ['http://localhost:3000'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

app.options(/^\/.*$/, cors({
  origin: allowedOrigins,
  credentials: true
}));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('hello world');
});

// app.use('/api/products', authMiddleware, productRoute);
app.use('/api/user', userRoute);
app.use('/api/timecounter', timeCounterRoute);

// MongoDB connection
const mongoUri = process.env.MONGO_URI as string;
const port = process.env.PORT || 3000;

mongoose
  .connect(mongoUri)
  .then(() => {
    console.log('Connected to database');
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Connection failed:', err);
  });
