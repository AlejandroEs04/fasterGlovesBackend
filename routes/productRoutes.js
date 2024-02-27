import express from "express";
const router = express.Router();

import { create, deleteOne, findAll, update } from "../controllers/productController.js";
import checkAuth from "../middleware/checkAuth.js";

// Rutas para Producto(s)
router.get('/', findAll);
router.post('/', create);
router.post('/:id/update', checkAuth, update);
router.get('/:id/delete', checkAuth, deleteOne);


export default router;