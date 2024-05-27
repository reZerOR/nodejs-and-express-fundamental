import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { UserRoutes } from './app/modules/user/user.route';
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// application routes
app.use('/api/v1/student', StudentRoutes);
app.use('/api/v1/users', UserRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  let message = err.message || 'something went wrong';

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
  });
});

export default app;
