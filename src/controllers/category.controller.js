const express = require('express');
const Category = require('../models/Category');
const router = express.Router();    // router - object to define routes

const categoriesCtrl = {};

categoriesCtrl.createCategory = async (req, res) => {
     try{
        const category = new Category(req.body);
        await category.save();
        return res.status(201).json({
            message: "Registered Category"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

categoriesCtrl.updateCategory = async (req, res) => {
     try{
        await Category.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Updated Category"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

categoriesCtrl.deleteCategory = async (req, res) => {
     try{
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Category Deleted"
        })
    }catch(err){
        return res.status(400).json({
            message: "Category not found",
            err
        })
    }
};

categoriesCtrl.getCategory = async (req, res) => {
     try{
        const category = await Category.findById(req.params.id);
        return res.status(200).json(category)
    }catch(err){
        return res.status(400).json({
            message: "Category not found",
            err
        })
    }
};

categoriesCtrl.getCategories = async (req, res) => {
     try{
        const categories = await Category.find();
        return res.status(200).json(categories)
    }catch(err){
        return res.status(400).json({
            message: "Bad request"
        })
    }
};

module.exports = categoriesCtrl;