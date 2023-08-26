const Product = require('../models/productsModel.js');

exports.getProductslistforUser = (req, res, next) => {
    Product.fetchAll()
        .then(
            (productsArray) => {
                res.render('user/product-list', { items: productsArray, pageTitle: 'Available products' });
            }
        )
        .catch(
            (err) => console.log(err)
        );
}

exports.getProductId = (req, res, next) => {
    const productId = req.params.productId;
    Product.findById(productId)
        .then((product) => {
            res.render('user/product-details', { product: product, pageTitle: product.productName });
        })
        .catch((err) => { console.log(err) });
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll()
        .then(
            (productsArray) => {
                res.render('user/index', { items: productsArray, pageTitle: 'My Shop' });
            }
        )
        .catch(
            (err) => console.log(err)
        );
};


exports.getCart = (req, res, next) => {
    //console.log(req.user.cart);
    req.user
        .getCart()
        .then((products) => {
            res.render('user/cart', { pageTitle: 'Your Cart', products: products });
        })
        .catch((err) => {
            console.log(err)
        })
}

//     Cart.getCart(cart => {
//         Product.fetchAll(products => {
//             const cartProducts = [];
//             for (eachProduct of products) {
//                 const cartProductData = cart.products.find(item => item.id === eachProduct.id);
//                 if (cartProductData) {
//                     cartProducts.push({ productData: eachProduct, qty: cartProductData.quantity });
//                 }
//             }
//             res.render('user/cart', { pageTitle: 'My Cart', path: '/cart', products: cartProducts });
//         })
//     })
//         .catch((err) => { console.log(err); })
// }


exports.postCart = (req, res, next) => {
    const productId = req.body.productId;
    Product.findById(productId)
        .then((product) => {
            return req.user.addToCart(product);
        })
        .then(result => {
            res.redirect('/cart')
            console.log("PRODUCT ADDED SUCCESSFULLY TO CART");
        });

}


exports.postCartDeleteProduct = (req, res, next) => {
    const productId = req.body.productId;
    req.user
        .deleteItemFromCart(productId)
        .then((result) => {
            console.log("PRODUCT DELETED SUCCESSFULLY FROM CART");
            res.redirect('/cart');
        })
        .catch((err) => {
            console.log(err);
        });
};

exports.postOrders = (req, res, next) => {
    let fetchedCart;
    req.user
        .addOrder()
        .then((result) => {
            res.redirect('/orders');
        })
        .catch(
            (err) => { console.log(err); }
        );
}

exports.getOrders = (req, res, next) => {
    req.user
        .getOrders()
        .then((orders) => {
            res.render('user/orders', { pageTitle: 'Your Orders', orders: orders });
        })
        .catch((err) => { console.log(err); })
}

exports.getCheckout = (req, res, next) => {
    res.render('user/checkout', { pageTitle: 'Checkout' });
}

