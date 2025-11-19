import express from 'express';
import dotenv from 'dotenv';
import type { Request, Response } from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response<{ message: string }>): void => {
  res.json({ message: 'hello' });
});

app.listen(PORT, () => console.log('server is listening on port: ', PORT));
