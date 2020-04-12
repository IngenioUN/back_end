const mongoose = require('mongoose');
const {Schema} = mongoose;

const Publication = new Schema({
    date: Date,
    title: String,
    abstract: String,
    type : String,
    text : String,
    keyWords : String,
});
    
module.exports = mongoose.model('Publication', Publication);