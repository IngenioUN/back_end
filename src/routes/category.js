const { Router } = require("express");
const router = Router();

const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategorys,
    getCategory
} = require("../controllers/categories.controller");

//routes

module.exports = router;