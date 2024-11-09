import { Router } from 'express';
import { getProjects, getProjectByName } from './projects.controller.js';

const router = Router();

router.get('/', getProjects);
router.get('/:name', getProjectByName);

export default router;
