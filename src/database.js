const mongoose = require("mongoose");

//mongoose.connect(process.inv.MONGODB_URI || 'mongodb://localhost/ingenio_database', {
    mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds145584.mlab.com:45584/heroku_1hthtw0p', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));