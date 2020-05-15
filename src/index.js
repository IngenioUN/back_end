const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path
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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

app.use(cors());
app.use(session({
    secret: 'IngenioUN',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes

app.use('/session', require('./routes/session'));
app.use('/user', require('./routes/user'));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
