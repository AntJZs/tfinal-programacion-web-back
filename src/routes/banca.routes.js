import { Router } from 'express';
import { methods } from '../controllers/banca.controller.js';

const router = Router();

router.get('/login', methods.verifyUser);
router.post('/register', methods.createUser);

export default router;
