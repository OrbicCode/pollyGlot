import OpenAI from 'openai';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function getTranslation(req: Request, res: Response) {
  const { text, targetLanguage } = req.body;

  const messages = [
    {
      role: 'system' as const,
      content: `You are a translator. You will be given text to translate by the user. 
                You will also be given the language to translate it into, placed between the ### separators below. 
                You will translate as accurately as possible and NOT add any flourishes.
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
  } catch (error) {}
}
