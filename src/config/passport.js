const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use(new localStrategy({
    usernameField: 'email1'
}, async(email1, password, done) =>{
    const user = await User.findOne({email1: email1});
    if(!user){
        return done(null, false, { message: "Not user founf" }, status = 400);
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user, { message: "User logged in" , status: 200});
        } else {
            return done(null, false, {message : "Incorrect Password"}, status = 400);
        }
    }
}));

passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log("desserialize");
    User.findById(id, (err, user) => {
        done(err, user);
    });
});