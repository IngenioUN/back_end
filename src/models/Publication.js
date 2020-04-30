const mongoose = require('mongoose');
const {Schema} = mongoose;

const Publication = new Schema({
    date: { type: Date, default: Date.now },
    title: { type: String, required: true },
    abstract: { type: String, required: true },
    keyWords: { type: [String], required: true },
    type: { type: [String], required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Publication', Publication);