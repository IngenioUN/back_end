const express = require('express');
const Author = require('../models/Author');
const router = express.Router();    // router - object to define routes

const authorsCtrl = {};

authorsCtrl.createAuthor = async (req, res) => {
    try{
        const author = new Author(req.body);
        await author.save();
        return res.status(201).json({
            message: "Registered Author"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }

    console.log(author);
    res.json({message: "Author saved"});
};

authorsCtrl.updateAuthor = async (req, res) => {
    try{
        await Author.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({
            message: "Updated Author"
        })
    }catch(err){
        return res.status(400).json({
            message: "Incomplete or poorly structured data",
            err
        })
    }
};

authorsCtrl.deleteAuthor = async (req, res) => {
    try{
        const author = await Author.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            message: "Author Deleted"
        })
    }catch(err){
        return res.status(400).json({
            message: "Author not found",
            err
        })
    }
};

authorsCtrl.getAuthor = async (req, res) => {
    try{
        const author = await Author.findById(req.params.id);
        return res.status(200).json(author)
    }catch(err){
        return res.status(400).json({
            message: "Author not found",
            err
        })
    }
};

authorsCtrl.getAuthors = async (req, res) => {
    try{
        const authors = await Author.find();
        return res.status(200).json(authors)
    }catch(err){
        return res.status(400).json({
            message: "Bad request",
            err
        })
    }
};

module.exports = authorsCtrl;