const mongoose = require('mongoose');
const {Schema} = mongoose;

const Author = new Schema({
    firstName: String,
    lastName: String,
    eMail: String,
    backUpEmail: String,
    desc: String,
    author_desc: String
});

module.exports = mongoose.model('Author', Author);