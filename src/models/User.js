const mongoose = require('mongoose');
const { Schema } = mongoose;


const User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email1: { type: String, required: true },
    password: { type: String, required: true },
    email2: { type: String, required: true },
    description: String
});

module.exports = mongoose.model('User', User);