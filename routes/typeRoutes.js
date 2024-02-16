import express from "express";
const router = express.Router();

import { create, findAll } from "../controllers/typeController.js";
import checkAuth from "../middleware/checkAuth.js";

router.route('/').get(findAll).post(checkAuth, create);

export default router;