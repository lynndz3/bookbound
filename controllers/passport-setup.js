const passport = require("passport");
const GoogleStrategy = require("passport-google-oidc");
const User = require("../models/users");
const Followers = require("../models/followers");
const mongoose = require("mongoose");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  // console.log("am I being deserialized?");
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      // options for google strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        process.env.NODE_ENV == "development"
          ? process.env.GOOGLE_AUTH_CALLBACK_LOCAL
          : process.env.GOOGLE_AUTH_CALLBACK_PROD,
      passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // check if user already exists in our own db
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          // already have this user
          console.log("user is: ", currentUser);
          done(null, currentUser);
        } else {
          //find the biggest UserId to incrememt by one and assign it to new user in database
          User.find({}, {userId: 1, _id: 0}).limit(1).sort({userId: -1}).then((maxId) => {
            if (maxId) {
            console.log(maxId[0].userId + 1)
            maxId = maxId[0].userId + 1;
            console.log(maxId);
            // if not, create user in our db
            new User({
            googleId: profile.id,
            first_name: ((profile.name.givenName) ? profile.name.givenName : ''),
            last_name: ((profile.name.familyName) ? profile.name.familyName : ''),
            email: profile.emails[0].value,
            userId: maxId
              })
            .save()
            .then((user) => {
              console.log("created new user: ", user);
              done(null, user);
            });
            }
          });
        }
      });
    }
  )
);




