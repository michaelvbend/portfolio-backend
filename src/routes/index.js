import { Router } from 'express';
import projectsRouter from './projects/projects.router.js';
import emailRouter from './email/email.router.js';
const router = Router();

router.use('/projects', projectsRouter);
router.use('/email', emailRouter);

export default router;
