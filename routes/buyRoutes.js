import express from 'express';
const router = express.Router();

import { createOrderPaypal, completeBuy, getUserBuys, getAllBuy, updateBuy, getBuy, deleteBuy } from '../controllers/buyController.js';
import checkAuth from '../middleware/checkAuth.js';

router.route('/').get(checkAuth, getUserBuys).post(checkAuth, createOrderPaypal)
router.get('/find/:id', checkAuth, getBuy)
router.post('/complete', checkAuth, completeBuy);
router.get('/admin', checkAuth, getAllBuy);
router.post('/update/:id', checkAuth, updateBuy);
router.route('/admin/:id').put(checkAuth, updateBuy).delete(checkAuth, deleteBuy)

export default router;