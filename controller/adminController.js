const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;
const Product = require('../models/productsModel.js');

exports.getAddedProductsadmin = (req, res, next) => {
    res.render('admin/edit-product', { pageTitle: 'Add Product', editing: false });
}

exports.postAddedProductsadmin = (req, res, next) => {
    const productName = req.body.productName;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description;
    const product = new Product(
        productName,
        price,
        imageUrl,
        description,
        null,
        req.user._id);
    product.save()
        .then((result) => {
            console.log("PRODUCT CREATED SUCCESSFULLY");
            return res.redirect('/admin/products');
        })
        .catch((err) => {
            console.log(err)
        })
}

exports.getEditProductsadmin = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.render('/');
    }
    const productId = req.params.productId;
    // req.user.getProducts({
    //     where: {
    //         _id: productId
    //     }
    // })
    Product.findById(productId)
        .then((product) => {
            //const product = products[0];
            if (!product) {
                return res.redirect('/');
            }
            res.render('admin/edit-product', { product: product, pageTitle: 'Edit Product', editing: editMode });
        })
        .catch(err => console.log(err));
}

exports.postEditProductsadmin = (req, res, next) => {
    const productId = req.body.productId;
    const updatedproductName = req.body.productName;
    const updatedprice = req.body.price;
    const updatedimageUrl = req.body.imageUrl;
    const updateddescription = req.body.description;

    const product = new Product(
        updatedproductName,
        updatedprice,
        updatedimageUrl,
        updateddescription,
        new ObjectId(productId)
    );
    product.save()
        .then((result) => {
            console.log('PRODUCT UPDATED SUCCESSFULLY');
            res.redirect('/admin/products');
        })
        .catch(
            (err) => {
                console.log(err);
            });
}

exports.getProductslistadmin = (req, res, next) => {
    Product.fetchAll()
        .then((productsArray) => {
            res.render('admin/product-listadmin', { items: productsArray, pageTitle: 'Products list for admin' });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.postDeleteProductadmin = (req, res, next) => {
    const productId = req.body.productId;
    Product.deleteById(productId)
        .then(() => {
            console.log('PRODUCT DESTROYED SUCCESSFULLY');
            res.redirect('/admin/products');
        })
        .catch(
            (err) => {
                console.log(err);
            })
}

