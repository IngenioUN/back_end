const mongoose = require("mongoose");

mongoose.connect(process.inv.MONGODB_URI || 'mongodb://localhost/ingenio_database', {
//mongoose.connect('mongodb+srv://Ingenio123:Ingenio123@clusteringenio-jv1l1.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));