import express from 'express';
const router = express.Router();

import { createOrderPaypal, completeBuy, getUserBuys, getAllBuy, updateBuy, getBuy } from '../controllers/buyController.js';
import checkAuth from '../middleware/checkAuth.js';

router.route('/').get(checkAuth, getBuy).post(checkAuth, createOrderPaypal);
router.get('/find/:id', checkAuth, getBuy)
router.post('/complete', checkAuth, completeBuy);
router.get('/admin', checkAuth, getAllBuy);
router.post('/update/:id', checkAuth, updateBuy);

export default router;