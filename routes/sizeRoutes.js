import express from "express";
const router = express.Router();

import { findAll } from "../controllers/sizeController.js";

router.get('/', findAll);

export default router;