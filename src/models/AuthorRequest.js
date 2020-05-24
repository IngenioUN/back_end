const mongoose = require('mongoose');
const { Schema } = mongoose;

const AuthorRequest = new Schema({
    date: { type: Date, default: Date.now },
    email2: { type: String, required: true },
    professionalCard: { type: String, required: true },
    employementHistory: { type: String, required: true },
    academicHistory: { type: String, required: true },
    userId: {type:String, require: true}
});

module.exports = mongoose.model('AuthorRequest', AuthorRequest);