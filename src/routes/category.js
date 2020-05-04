const { Router } = require("express");
const router = Router();

const {
    createCategory,
    updateCategory,
    deleteCategory,
    getCategories,
    getCategory
} = require("../controllers/category.controller");

//routes

router
    .route("/all")           //get all categories
    .get(getCategories);

router
    .route("/:id")          //get category by id, it should be by name?
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

router
    .route("/new")
    .post(createCategory);


module.exports = router;