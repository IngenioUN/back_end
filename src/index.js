const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path
var cors = require('cors') // CORS

const app = express();
mongoose.connect('mongodb://localhost/ingenio_database', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
// meaning: dev - small message
app.use(morgan('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes

app.use('/user', require('./routes/user'));
app.use('/publication', require('./routes/publication'));
app.use('/category', require('./routes/category'));
app.use('/admin', require('./routes/admin'));
app.use('/admin', require('./routes/author'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});