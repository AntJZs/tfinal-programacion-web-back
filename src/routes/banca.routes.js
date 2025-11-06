import { Router } from 'express';
import { methods } from '../controllers/banca.controller.js';

const router = Router();

router.get('/login', methods.verifyUser);
router.post('/register', methods.createUser);
router.get('/users/details', methods.getDetalles);
router.get('/users/balhist', methods.getBalHistory);
router.get('/users/loanhist', methods.getLoanHistory);
router.get('/users/stats', methods.getStats);
router.post('/transactions/create', methods.createTransaction);
router.post('/loans/create', methods.createLoan);

export default router;
