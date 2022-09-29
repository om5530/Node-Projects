const express = require("express");
const router = express.Router();

// IMPORTING CONTROLLERS
const {createProduct, getProducts,getProductsById, updateProductById, deleteProductById} = require('../controllers/productController');
const {createCart, updateCartById, getCartById,deleteCartById } = require('../controllers/cartController');
const { createUser, loginUser, getUserById, updateUserById } = require('../controllers/userController');
const { placeOrder, updateOrderById } = require("../controllers/orderController")
const { authentication } = require('../middleware/authentication')


//----------- USER API'S
router.post('/register', createUser)
router.post('/login',    loginUser )
router.get('/user/:userId/profile', authentication, getUserById   )
router.put('/user/:userId/profile', authentication, updateUserById)

//----------- PRODUCT API'S
router.post('/products',              createProduct    )
router.get('/products',               getProducts      )
router.get('/products/:productId',    getProductsById  )
router.put('/products/:productId',    updateProductById)
router.delete('/products/:productId', deleteProductById)

//----------- CART API'S(PROTECTED ROUTES)
router.post('/users/:userId/cart',                   createCart)
router.put('/users/:userId/cart',    authentication, updateCartById)
router.get('/users/:userId/cart',    authentication, getCartById   )
router.delete('/users/:userId/cart', authentication, deleteCartById)

//----------- ORDER API'S
router.post('/users/:userId/orders', placeOrder)
router.put ('/users/:userId/orders', authentication, updateOrderById)

// EXPORTING ROUTER
module.exports = router;