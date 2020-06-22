const mongoose = require( 'mongoose' );
const { Schema } = mongoose;

const Notification = new Schema({
    authorId : { type: Schema.Types.ObjectId, ref: 'User' },
    categoryId : { type: Schema.Types.ObjectId, ref: 'Category' },
    subscribers : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    listPublication : { type: Schema.Types.ObjectId, ref: 'Publication' },
})
module.exports = mongoose.model( 'Notification', Notification );