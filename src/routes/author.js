const { Router } = require("express");
const router = Router();

const {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors,
    getAuthor
} = require("../controllers/authors.controller");

//routes

module.exports = router;