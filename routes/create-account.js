var express = require('express');
var passport = require('passport');
var router = express.Router();


router.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] })); 

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
 function(req, res) {
  res.redirect('/readers');
});

module.exports = router;
