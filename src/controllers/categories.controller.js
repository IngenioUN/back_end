const express = require('express');
const Category = require('../models/Category');
const router = express.Router();    // router - object to define routes

const categoriesCtrl = {};

categoriesCtrl.createCategory = async (req, res) => {
    const category = new Category(req.body);
    await category.save();
    console.log(category);
    res.json({message: "Category saved"});
};

categoriesCtrl.updateCategory = async (req, res) => {
    await Category.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Category Updated"});
};

categoriesCtrl.deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndDelete(req.params.id);
    res.json({message: "Category deleted", category});
};

categoriesCtrl.getCategory = async (req, res) => {
    const category = await Category.findById(req.params.id);
    console.log(category);
    res.json({category});
};

categoriesCtrl.getCategories = async (req, res) => {
    const categories = await Category.find();
    console.log('continue');
    res.json(categories);
};

module.exports = categoriesCtrl;