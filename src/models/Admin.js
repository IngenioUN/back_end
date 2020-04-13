const mongoose = require('mongoose');
const {Schema} = mongoose;

const Admin = new Schema({
    firstName: String,
    lastName: String,
    eMail: String,
    backUpEmail: String,
    desc: String
});   

module.exports = mongoose.model('Admin', Admin);