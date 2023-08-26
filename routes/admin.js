const path = require('path');

const express = require('express');

const adminController = require('../controller/adminController')

const router = express.Router();

router.get('/add-product', adminController.getAddedProductsadmin);

router.get('/products', adminController.getProductslistadmin);

router.post('/add-product', adminController.postAddedProductsadmin);

router.get('/edit-product/:productId', adminController.getEditProductsadmin);

router.post('/edit-product', adminController.postEditProductsadmin);

router.post('/delete-product', adminController.postDeleteProductadmin);

module.exports = router;