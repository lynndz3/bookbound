const User = require("../models/users");
// const { body, validationResult } = require("express-validator");

exports.create_account_get = (req, res) => {
            res.render("createAccount");
        };

exports.login_get = (req, res) => {
    res.render("login");
}

exports.create_account_post = (req, res, next) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        id: 2,
        first_name: 'Test',
        last_name: 'Subject'
      }).save(err => {
        if (err) { 
          return next(err);
        }
        res.redirect("/");
      });
    };

