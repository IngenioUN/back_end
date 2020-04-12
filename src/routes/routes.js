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
    const task = new Task(req.body);
    await task.save();
    res.json({
        status: 'Saved'
    })
})

router.put('/:id', async (req, res) =>{
    await Task.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Updated'
    });
});

router.delete('/:id', async(req, res) => {
    await Task.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Deleted'
    });
});

module.exports = router;