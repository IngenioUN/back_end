const session = require('express-session');
const passport = require('passport');
const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const cors = require('cors');

require('./config/passport');
const app = express();

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
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin,\
    X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Routes

app.use('/session', require('./routes/session'));
// Carlos
app.use('/user', require('./routes/user'));

// Juan
app.use('/author-request', require('./routes/authorRequest'));

// Valeria


module.exports = app;