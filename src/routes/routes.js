const express = require('express');
// meaning: router - object to define routes
const router = express.Router();
const User = require('../models/User');

// Route definition

router.get('/', async (req, res) => {
    const users = await User.find();
    console.log(users);
    res.json(users);
});

router.post('/', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.json({
        status: 'Saved'
    })
})

router.put('/:id', async (req, res) =>{
    await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Updated'
    });
});

router.delete('/:id', async(req, res) => {
    await User.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Deleted'
    });
});

module.exports = router;