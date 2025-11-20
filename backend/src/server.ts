import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';
import { translationRouter } from './routes/translation';

dotenv.config();

const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;

app.use(express.json());

app.use('/translation', translationRouter);

app.use((req: Request, res: Response<{ message: string }>): void => {
  res.status(404).json({ message: 'Endpoint not found' });
});

app.listen(PORT, () => console.log('server is listening on port: ', PORT));
