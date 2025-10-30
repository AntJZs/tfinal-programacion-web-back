import { Router } from 'express';
import { methods } from '../controllers/user.controller.js';

const router = Router();

router.get('/login', methods.verifyUser);

export default router;
