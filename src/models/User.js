const mongoose = require( 'mongoose' );
const bcrypt = require( 'bcryptjs' );
const { Schema, model } = mongoose;


const User = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email1: { type: String, required: true },
    password: { type: String, required: true },
    description: { type: String, required: false },
    email2: { type: String, required: false },
    professionalCard: { type: String, required: false },
    employmentHistory: { type: String, required: false },
    academicHistory: { type: String, required: false },
    role: { type: Number, default: 0 },
});

User.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt( 10 );
    return await bcrypt.hash( password, salt );
};

User.methods.matchPassword = async function ( password ) {
    return await bcrypt.compare( password, this.password );
};

User.methods.emailIsValid = function ( email ) {
    var exp = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return exp.test( email );
};

User.methods.passwordIsValid = function ( password ) {
    var exp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
    return exp.test( password );
}

module.exports = model( 'User', User );