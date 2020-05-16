const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const rfs = require('rotating-file-stream'); //version 2.x
>>>>>>> d0cfdc701346ced124a737ec1c46b42892caee71
=======
const rfs = require('rotating-file-stream'); //version 2.x
>>>>>>> feature/models

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
var accessLogStream = rfs.createWriteStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log'),
     flags: 'a' })

// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))
app.use(logger('dev'));
app.use(express.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
<<<<<<< HEAD
<<<<<<< HEAD

=======
// app.use('dev');
>>>>>>> d0cfdc701346ced124a737ec1c46b42892caee71
=======
// app.use('dev');
>>>>>>> feature/models
app.use(cors());
app.use(session({
    secret: 'IngenioUN',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes

<<<<<<< HEAD
<<<<<<< HEAD
app.use('/ingenio', require('./routes/session'));
app.use('/user', require('./routes/user'));
app.use('/publication', require('./routes/publication'));
app.use('/category', require('./routes/category'));
app.use('/admin', require('./routes/admin'));
app.use('/admin', require('./routes/author'));

=======
=======
>>>>>>> feature/models
app.use('/session', require('./routes/session'));
app.use('/user', require('./routes/user'));
//Juan
app.use('/author-request', require('./routes/authorRequest'));
//TATIANA


//Carlos
<<<<<<< HEAD
>>>>>>> d0cfdc701346ced124a737ec1c46b42892caee71
=======
>>>>>>> feature/models

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
