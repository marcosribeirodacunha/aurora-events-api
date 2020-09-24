import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Ok' });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  console.log(err);
  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server is running');
});
