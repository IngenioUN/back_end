const rfs = require('rotating-file-stream'); //version 2.x
const session = require('express-session');
const passport = require('passport');
const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const cors = require('cors');
const path = require('path');   // Manage directory path

require('./config/passport');
const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

// setup the logger
var accessLogStream = rfs.createStream('access.log', {
interval: '1d',
path: path.join(__dirname, 'log')
 });

app.use(morgan('combined', { stream: accessLogStream }))

// Middleware
app.use(cors({
    origin: "http://localhost:8080",
    credentials: true
}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
app.use(morgan('dev'));
app.use(express.json());
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
app.use('/author-request', require('./routes/authorRequest'));
app.use('/publication', require('./routes/publication'));
app.use('/category', require('./routes/category'));

// Juan

// Valeria

// Carlos

// Tatiana

module.exports = app;
