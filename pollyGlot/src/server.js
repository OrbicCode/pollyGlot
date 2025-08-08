import express from 'express';
import dotenv from 'dotenv';
import { OpenAI } from 'openai';

dotenv.config();

const app = express();
app.use(express.json());
const PORT = 3001;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/translate', async (req, res) => {
  console.log('OPENAI_API_KEY:', process.env.OPENAI_API_KEY);
  const { text, language } = req.body;
  try {
    if (!text || !language) {
      console.error('Missing text or language field:', { text, language });
      return res.status(400).json({ error: 'Missing text or language field.' });
    }

    const messages = [
      {
        role: 'system',
        content: `You are a translation assistant. Translate the following text into ${language}. Only return the translated text.`,
      },
      {
        role: 'user',
        content: text,
      },
    ];

    const response = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const translation = response.choices?.[0]?.message?.content;
    if (!translation) {
      console.error('No translation returned from OpenAI:', response);
      return res
        .status(500)
        .json({ error: 'No translation returned from OpenAI.' });
    }
    res.json({ translation });
  } catch (error) {
    console.error('Error in /api/translate:', error);
    res.status(500).json({ error: error.message || 'Internal server error.' });
  }
});

app.listen(PORT, () => console.log(`server is listening on port: ${PORT}`));
