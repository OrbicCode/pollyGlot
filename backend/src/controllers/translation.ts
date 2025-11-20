import OpenAI from 'openai';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function postTranslation(
  req: Request<{}, unknown, { text: string; targetLanguage: string }>,
  res: Response<{ translation: string | null } | { error: string }>
) {
  const { text, targetLanguage } = req.body;

  if (!text || !targetLanguage) {
    return res.status(400).json({ error: 'Text and target language are required.' });
  }

  const messages = [
    {
      role: 'system' as const,
      content: `You are a translator. You will be given text to translate by the user. 
                You will also be given the language to translate it into, placed between the ### separators below. 
                You will translate as accurately as possible and use proper grammer.
                ###
                ${targetLanguage}
                ###`,
    },
    {
      role: 'user' as const,
      content: text,
    },
  ];
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.1-nano',
      messages: messages,
    });

    const translation = response.choices[0].message.content;

    if (!translation) {
      return res.status(500).json({ error: 'OpenAI response returned empty' });
    }

    res.json({ translation: translation });
  } catch (error: any) {
    console.error('OpenAI API Error: ', error);
    res.status(500).json({ error: error.message || 'An unexpected error occurred' });
  }
}
