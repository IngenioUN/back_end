const { Router } = require("express");
const router = Router();

const {
    createAuthor,
    updateAuthor,
    deleteAuthor,
    getAuthors,
    getAuthor
} = require("../controllers/author.controller");

//routes

module.exports = router;