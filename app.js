var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();
const session = require('express-session');
const passportSetup = require("./public/javascripts/passport-setup");
const passport = require("passport");
const bodyParser = require("body-parser");

var app = express();

// Routes!
var indexRouter = require('./routes/index');
var readersRouter = require('./routes/readers');
var signUpRouter = require('./routes/create-account')

// Mongoose (database) connection
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://admin:password.123@cluster0.wuctjcp.mongodb.net/bookbound?retryWrites=true&w=majority";
mongoose.set('strictQuery', false);
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Database Connected"))
.catch((err) => console.log(err));
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//authentication set-up
app.use(session({ secret: "password123", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//url paths corresponding to routes
app.use('/', indexRouter);
app.use('/readers', readersRouter);
app.use('/create-account', signUpRouter);

//logout function
app.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
