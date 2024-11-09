import { Router } from 'express';
import projectsRouter from './projects/projects.router.js';

const router = Router();

router.use('/projects', projectsRouter);

export default router;
