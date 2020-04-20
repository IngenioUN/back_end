const { Router } = require("express");
const router = Router();

const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory
} = require("../controllers/categories.controller");

//routes

module.exports = router;