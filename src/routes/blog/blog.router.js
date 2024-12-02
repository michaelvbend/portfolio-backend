import { Router } from 'express';
import { getBlogArticle, getBlogArticles } from './blog.controller.js';

const router = Router();

router.get('/', getBlogArticles);
router.get('/:slug', getBlogArticle);
router.post('/');

export default router;
