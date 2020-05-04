const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema, model } = mongoose;

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

User.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

User.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

module.exports = model('User', User);