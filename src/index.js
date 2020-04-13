const express = require('express'); // Framework 
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path

const app = express();
mongoose.connect('mongodb://localhost/ingenio_database')
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

// Settings
app.set('port', process.env.PORT || 3000);


// Middlewares
// meaning: dev - small message
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/ingenio', require('./routes/routes'));

// Static files
// Describe the path of the front_end directory
app.use(express.static(path.join(__dirname, '../../front_end/src/public')));


// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));    
});