const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    firstName: String,
    lastName: String,
    eMail: String,
    backUpEmail: String,
    desc: String
});
    
module.exports = mongoose.model('User', User);