import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from './errors/AppError';
import './database';
import uploadConfig from './config/upload';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

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

app.listen(process.env.PORT || 3333, () => {
  console.log('---------- Server is running ----------');
});
