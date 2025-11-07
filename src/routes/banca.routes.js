import { Router } from 'express';
import { methods } from '../controllers/banca.controller.js';
import cors from 'cors';
const router = Router();

router.post('/login', cors({ origin: 'http://localhost:5173' }), methods.verifyUser);
router.post('/register', cors({ origin: 'http://localhost:5173' }), methods.createUser);
router.get('/users/details', cors({ origin: 'http://localhost:5173' }), methods.getDetalles);
router.get('/users/balhist', cors({ origin: 'http://localhost:5173' }), methods.getBalHistory);
router.get('/users/loanhist', cors({ origin: 'http://localhost:5173' }), methods.getLoanHistory);
router.get('/users/stats', cors({ origin: 'http://localhost:5173' }), methods.getStats);
router.post('/transactions/create', cors({ origin: 'http://localhost:5173' }), methods.createTransaction);
router.post('/loans/create', cors({ origin: 'http://localhost:5173' }), methods.createLoan);

export default router;
