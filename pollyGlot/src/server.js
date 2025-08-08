import express from 'express';
import { OpenAI } from 'openai';

const app = express();
const PORT = 3001;
const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

app.post('/api/translate', async (req, res) => {});

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
