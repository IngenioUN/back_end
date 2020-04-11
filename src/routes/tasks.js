const express = require('express');
// meaning: router - object to define routes
const router = express.Router();
const Task = require('../models/task');

// Route definition

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    console.log(new Task)
    res.json('received');
})

module.exports = router;