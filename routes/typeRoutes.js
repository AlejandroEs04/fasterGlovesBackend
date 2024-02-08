import express from "express";
const router = express.Router();

import { findAll } from "../controllers/typeController.js";

router.get('/', findAll);

export default router;