import express from "express";
const router = express.Router();

import { register, auth, confirm, forgetPassword, checkToken, newPassword, porfile, getCart, addCart, update, deleteProductCart } from "../controllers/userController.js";
import checkAuth from "../middleware/checkAuth.js";

router.post('/', register);
router.post('/login', auth);
router.get('/confirm/:token', confirm);
router.post('/forget-password', forgetPassword);
router.route('/forget-password/:token').get(checkToken).post(newPassword);

router.route('/porfile').get(checkAuth, porfile).post(checkAuth, update)

router.route('/cart').get(checkAuth, getCart).post(checkAuth, addCart);
router.post('/cart/delete', checkAuth, deleteProductCart);

export default router;