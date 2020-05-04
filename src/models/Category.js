const mongoose = require('mongoose');
const {Schema} = mongoose;

const Category = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true }
});

Category.static('findByName', (name) => {
    return this.find({name: name});
})

module.exports = mongoose.model('Category', Category);