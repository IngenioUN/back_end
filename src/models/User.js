const mongoose = require('mongoose');
const {Schema} = mongoose;

const User = new Schema({
    //firstName: String,
    //lastName: String,
    eMail: String,
    //backUpEmail: String,
    //desc: String
    pass1: String,
    pass2: String,
    type: String
});
    
module.exports = mongoose.model('User', User);