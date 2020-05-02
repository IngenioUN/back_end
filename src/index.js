const express = require('express'); // Framework
const morgan = require('morgan');   // Show browser requests
const mongoose = require('mongoose');   //Connect to MongoDB
const path = require('path');   // Manage directory path
const methodOverride = require('method-override'); //evaluar
const session = require('express-session');
const passport = require('passport');

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
app.set('port', process.env.PORT || 3106);


// Middlewares
// meaning: dev - small message
app.use(morgan('dev'));
app.use(express.json());
app.use(methodOverride('_method')); //otros metodos PUT y DELETE -> evaluar
app.use(session({
    secret: 'IngenioUN',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/user', require('./routes/user'));
app.use('/publication', require('./routes/publication'));
app.use('/category', require('./routes/category'));
app.use('/admin', require('./routes/admin'));
app.use('/admin', require('./routes/author'));

// Static files
// Describe the path of the front_end directory
app.use(express.static(path.join(__dirname, '../../front_end/src/public')));

// Server is listening
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});