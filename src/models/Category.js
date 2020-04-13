const mongoose = require('mongoose');
const {Schema} = mongoose;

const Category = new Schema({
    desc: String
});
    
module.exports = mongoose.model('Category', Category);