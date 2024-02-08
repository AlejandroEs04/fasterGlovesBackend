import express from "express";
const router = express.Router();

import { create, findAll } from "../controllers/productController.js";

// Rutas para Producto(s)
router.get('/', findAll);
router.post('/', create);


export default router;