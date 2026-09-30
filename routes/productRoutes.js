const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { cacheMiddleware } = require('../middleware/cacheMiddleware');

router.get('/', cacheMiddleware, productController.getAll);
router.get('/:id', cacheMiddleware, productController.getById);

router.post('/', productController.create);
router.put('/:id', productController.update);
router.patch('/:id', productController.patch);
router.delete('/:id', productController.remove);

module.exports = router;
