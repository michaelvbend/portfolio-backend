import { Router } from 'express';
import projectsRouter from './projects/index.js';

const router = Router();

router.use('/projects', projectsRouter);

export default router;
