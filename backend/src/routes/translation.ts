import express from 'express';
import { getTranslation } from '../controllers/translation';

export const translationRouter = express.Router();

translationRouter.get('/translation', getTranslation);
