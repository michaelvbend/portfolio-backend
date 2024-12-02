import { Router } from 'express';
import { getProjects, getProjectBySlug } from './projects.controller.js';

const router = Router();

router.get('/', getProjects);
router.get('/:slug', getProjectBySlug);

export default router;
