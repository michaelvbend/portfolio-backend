import { Router } from 'express';
import { getProjects, getProjectById } from './projectsController.js';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);

export default router;
