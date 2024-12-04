import { Router } from 'express';
import projectsRouter from './projects/projects.router.js';
import emailRouter from './email/email.router.js';
import blogRouter from './blog/blog.router.js';
const router = Router();

router.use('/projects', projectsRouter);
router.use('/email', emailRouter);
router.use('/blog', blogRouter);

export default router;
