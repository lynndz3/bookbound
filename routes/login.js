var express = require('express');
var passport = require('passport');
var router = express.Router();

// GET google sign-in page
router.get('/login/google', passport.authenticate('google', { scope : ['profile', 'email'] })); 

router.get("/google/callback", passport.authenticate('google', { failureRedirect: '/' }),
function(req, res) {
  // Successful authentication, redirect home.
  res.redirect('/readers');
});

module.exports = router;