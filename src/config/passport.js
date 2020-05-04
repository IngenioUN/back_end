const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/User');

passport.use("local-signin", new localStrategy({
    usernameField: "email1",
    passwordField: "password",
    passReqToCallback: true
}, async(email1, password, done) =>{
    console.log('ENTRA A SIGNIN');
    console.log(email1, password);
    const user = await User.findOne({email1: email1});
    if(!user){
        console.log("USUARIO NO EXISTE");
        return done(null, false, { message: "Not user founf" }, status = 400);
    } else {
        const match = await user.matchPassword(password);
        if(match) {
            return done(null, user, { message: "User logged in" , status: 200});
        } else {
            console.log("CONTRASEÑA INCORRECTA");
            return done(null, false, {message : "Incorrect Password"}, status = 400);
        }
    }
}));

passport.use("local-signup", new localStrategy({
    usernameField: "email1",
    passwordField: "password",
    passReqToCallback: true
}, async(req, email1, password, done) => {
    const user = await User.findOne({ "email1": email1 });
    const {confirmPassword} = req.body;

    if(user) return done(null, false, {message: "The email is already taken.", status: 400});
    if(password.toString().length < 3) return done(null, false, { message: "The password must be at least 3 characters", status: 400 });
    if(password != confirmPassword) return done(null, false, { message: "Password do not match", status: 400});

    const newUser = new User(req.body);
    newUser.password =  await newUser.encryptPassword(password);
    console.log("USUARIO GUARDADO");
    console.log(newUser);
    await newUser.save();
    return done(null, newUser, { message: "Registered user", status: 201});
}));

passport.serializeUser((user, done) => {
    console.log("serialize");
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log("desserialize");
    User.findById(id, (err, user) => {
        done(err, user);
    });
});