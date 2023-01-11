// const passport = require('passport');
// const User = require('../../models/users');
// const mongoose = require('mongoose');
// const LocalStrategy = require("passport-local").Strategy;

// passport.serializeUser((user, done) => {
//     done(null, user);
//     });

// passport.deserializeUser((id, done) => {
//     // console.log("am I being deserialized?");
//     User.findById(id).then((user) => {
//     done(null, user);
//         });
//     });

// passport.use(
//         new LocalStrategy((username, password, done) => {
//             console.log("test user is " + username);
//             User.findOne({ username: username}, (err, user) => {
//                 if (err) { 
//                     return done(err);
//                   }
//                   if (!user) {
//                     return done(null, false, { message: "Incorrect username" });
//                   }
//                   if (user.password !== password) {
//                     return done(null, false, { message: "Incorrect password" });
//                   }
//                   return done(null, user);
//                 });
//               })
//             );