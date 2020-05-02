const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');


const User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email1: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true},
    email2: { type: String, required: true },
    active: { type: Boolean, default: true},
    //myList: { type: [String], required: false},
    description: String
});

User.methods.encryptPassword = async (password) =>{
    console.log(password);
    const salt = await bcrypt.genSalt(10);
    const hash = bcrypt.hash(password, salt);
    return hash;
};

User.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('User', User);