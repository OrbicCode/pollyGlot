import express from 'express';
import { postTranslation } from '../controllers/translation';

export const translationRouter = express.Router();

translationRouter.post('/translation', postTranslation);
