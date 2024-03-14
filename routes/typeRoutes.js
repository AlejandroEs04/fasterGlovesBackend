import express from "express";
const router = express.Router();

import { create, deleteOne, findAll, update } from "../controllers/typeController.js";
import checkAuth from "../middleware/checkAuth.js";

router.route('/').get(findAll).post(checkAuth, create);
router.route('/:id').put(checkAuth, update).delete(checkAuth, deleteOne);

export default router;