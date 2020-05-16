const mongoose = require('mongoose');
const {Schema} = mongoose;

const Publication = new Schema({
    date: { type: Date, default: Date.now },
    email2: { type: String, required: true },
    professionalCard: { type: String, required: true },
    employementHistory: { type: String, required: true },
    academicHistory: { type: String, required: true },
});

module.exports = mongoose.model('AuthorRequest', AuthorRequest);