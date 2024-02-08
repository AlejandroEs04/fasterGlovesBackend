import express from 'express';
const router = express.Router();

import checkAuth from '../middleware/checkAuth.js';
import { addArticle, deleteArticle, getArticles, updateArticle } from '../controllers/ArticlesController.js';
import { addType, deleteType, getTypes, updateType } from '../controllers/ArticleTypesController.js';
import { addArticleChild, deleteArticleChild, updateArticleChild } from '../controllers/ArticlesChildController.js';

// Article Routes
router.route('/').get(getArticles).post(checkAuth, addArticle)
router.post('/:id', checkAuth, updateArticle);
router.get('/:id/delete', checkAuth, deleteArticle);

// Child Article Route
router.post('/:id/subarticles', checkAuth, addArticleChild);
router.post('/:id/subarticles/:childId', checkAuth, updateArticleChild);
router.get('/:id/subarticles/:childId/delete', checkAuth, deleteArticleChild);

// Types Article Route 
router.route('/type').get(getTypes).post(checkAuth, addType);
router.post('/type/:id', checkAuth, updateType);
router.get('/type/:id/delete', checkAuth, deleteType);

export default router;