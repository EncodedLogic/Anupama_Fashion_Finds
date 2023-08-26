const path = require('path');

const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')

router.get('/', userController.getIndex);

router.get('/products', userController.getProductslistforUser);

router.get('/products/:productId', userController.getProductId);

router.get('/cart', userController.getCart);

router.post('/cart', userController.postCart);

router.post('/cart-delete-item', userController.postCartDeleteProduct);

router.post('/create-order', userController.postOrders);

router.get('/orders', userController.getOrders);

//router.get('/checkout', userController.getCheckout);

module.exports = router;