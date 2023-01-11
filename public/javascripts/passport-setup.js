const passport = require('passport');
const GoogleStrategy = require('passport-google-oidc');
const User = require('../../models/users');
const mongoose = require('mongoose');
require('https').globalAgent.options.rejectUnauthorized = false;

passport.serializeUser((user, done) => {
    done(null, user);
    });

passport.deserializeUser((id, done) => {
    // console.log("am I being deserialized?");
    User.findById(id).then((user) => {
    done(null, user);
        });
    });

passport.use(new GoogleStrategy ({
    // options for google strategy
    clientID: '845597817109-g3foc79kb8eaf6lkj4vhk6h1spv54urr.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:3000/create-account/google/callback',
    passReqToCallback : true
    }, 
    
    async (accessToken, refreshToken, profile, done) => {
    // check if user already exists in our own db
    User.findOne({googleId: profile.id}).then((currentUser) => {
    if(currentUser){
    // already have this user
        console.log('user is: ', currentUser);
        done(null, currentUser);
    } else {
    console.log(profile.emails[0].value);
// if not, create user in our db
    new User({
        googleId: profile.id,
        first_name: profile.name.givenName,
        last_name: profile.name.familyName,
        email: profile.emails[0].value,
        }).save().then((user) => {
            console.log('created new user: ', user);
            done(null, user);
            });
    }})
}));