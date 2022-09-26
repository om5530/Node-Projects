const express = require("express");
const router = express.Router();
const { register, login } = require('../Controllers/userController');
const { createBook, getAllBooks,getById, updateById, deletedById } = require('../Controllers/bookController');
const { createReview, updateReview, deleteReview, } = require('../Controllers/reviewController');
const {authentication} = require("../middleware/middleware");

//-----------------------------USER API's
router.post("/registerUser",register);
router.post("/login",login);

//-----------------------------BOOK API's
// PROTECTED ROUTES
router.post("/books", authentication, createBook);
router.get("/books", authentication, getAllBooks);
router.get("/book/:bookId", authentication,getById);
router.put("/books/:bookId", authentication, updateById);
router.delete("/books/:bookId", authentication, deletedById);

//-----------------------------REVIEW API's
// PROTECTED ROUTED
router.post("/books/:bookId/review",  createReview);
router.put("/books/:bookId/review/:reviewId", updateReview);
router.delete("/books/:bookId/review/:reviewId", deleteReview);


module.exports =  router ;