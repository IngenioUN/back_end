const express = require('express');
const Author = require('../models/Author');
const router = express.Router();    // router - object to define routes

const authorsCtrl = {};

authorsCtrl.createAuthor = async (req, res) => {
    const author = new Author(req.body);
    await author.save();
    console.log(author);
    res.json({message: "Author saved"});
};

authorsCtrl.updateAuthor = async (req, res) => {
    await Author.findByIdAndUpdate(req.params.id, req.body);
    res.json({message: "Author Updated"});
};

authorsCtrl.deleteAuthor = async (req, res) => {
    const author = await Author.findByIdAndDelete(req.params.id);
    res.json({message: "Author deleted", author});
};

authorsCtrl.getAuthor = async (req, res) => {
    const author = await Author.findById(req.params.id);
    console.log(author);
    res.json({author});
};

authorsCtrl.getAuthors = async (req, res) => {
    const authors = await Author.find();
    console.log('continue');
    res.json(authors);
};

module.exports = authorsCtrl;