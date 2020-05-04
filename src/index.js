const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path
const methodOverride = require('method-override'); //evaluar
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

const app = express();
require('./config/passport');

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


// Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(session({
    secret: 'IngenioUN',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/ingenio', require('./routes/session'));

// Static files
// Describe the path of the front_end directory
app.use(express.static(path.join(__dirname, '../../front_end/src/public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});