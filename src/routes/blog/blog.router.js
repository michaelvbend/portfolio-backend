import { Router } from 'express';
import {
  createBlogArticle,
  getBlogArticleBySlug,
  getBlogArticles,
} from './blog.controller.js';

const router = Router();

router.get('/', getBlogArticles);
router.get('/:slug', getBlogArticleBySlug);
router.post('/', createBlogArticle);

export default router;
