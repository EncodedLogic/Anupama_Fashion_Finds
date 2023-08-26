console.log('The Server at Port : 3000 have started');


//This is a core module and it is no longer required bcoz they are already implemented by express.js 
//const http = require('http');
const path = require('path');

//These are 3rd party modules
const express = require('express');
const bodyParser = require('body-parser');

//My project custom modules
const adminRoutes = require('./routes/admin.js');
const userRoutes = require('./routes/user.js');
const unknownRoutes = require('./routes/page404.js');
const mongodbConnection = require('./util/database_connection.js').mongodbConnection;
const User = require('./models/usermodel.js');
const Product = require('./models/productsModel.js');
// const Order = require('./models/ordersmodel.js');
// const OrderItem = require('./models/order-item.js');



const app = express();

//Global values are set here
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('64e779274eae3b21a63c24c2')
        .then((user) => {
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch((err) => {
            console.log(err);
        })
});

app.use('/admin', adminRoutes);
app.use(userRoutes);
app.use(unknownRoutes);

// app.use((req, res, next) => {
//     next();
// })

mongodbConnection(() => {
    app.listen(3000);
})


/*
This is sequelize code
app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((err) => {
            console.log(err);
        })
});

//ASSOCIATIONS
// Product.belongsTo(User,
//     {
//         constraints: true,
//         onDelete: 'CASCADE'
//     });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product, { through: Cart  });
// Product.belongsToMany(Cart, { through: CartItem });
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product, { through: OrderItem });

// connectionPool
//     //.sync({ force: true })
//     .sync()
//     .then((result) => {
//         return User.findByPk(1);
//     })
//     .then((user) => {
//         if (!user) {
//             return User.create({
//                 userName: "Anandhu",
//                 emailId: "anandukumar052@gmail.com"
//             }
//             )
//         }
//         return user;
//     })
//     .then((user) => {
//         return user.createCart();
//         // console.log(user);
//     })
//     .then((cart) => {
//         app.listen(3000);
//     })
//     .catch((err) => {
//         console.log(err);
//     })
*/

/*
These two lines of code are not required any more as they are replaced by app.listen(3000)

const serverName = http.createServer(app);
serverName.listen(3000);

*/