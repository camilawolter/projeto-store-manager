const express = require('express');
const productsController = require('../controllers/products.controller');
const validateProduct = require('../middlewares/validateProducts');

const router = express.Router();

router.get('/', productsController.listAllProducts);

router.get('/:id', productsController.listProductById);

router.post('/', validateProduct, productsController.createProduct);

module.exports = router;