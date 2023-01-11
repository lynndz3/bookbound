var express = require('express');
var router = express.Router();
// var passport = require('passport');
// const passportSetupLocal = require("../public/javascripts/passport-setup-local");


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { currentUser: req.user });
});

// router.post('/', passport.authenticate('local', {
//   successRedirect: "/readers",
//   failureRedirect: "/"
// }));


module.exports = router;
