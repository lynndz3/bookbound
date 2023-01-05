const User = require("../models/users");
const Books = require("../models/books");
const { body, validationResult } = require("express-validator");


const async = require("async");

exports.user_list = (req, res) => {
    async.parallel(
        {
            user_count(callback) {
                User.countDocuments({}, callback);
            },
            user_detail(callback) {
                User.findOne({}, {first_name: 1, _id: 0}, callback);
            }
        },
        (err, results) => {
            res.render("users", {
                error: err,
                data: results,
            });
        }
    );
};

exports.user_books = (req, res) => {
    async.parallel (
        {
            book_count(callback) {
                Books.countDocuments({}, callback);
            },
            book_detail(callback) {
                Books.find({}, callback);
            }
        },
        (err, results) => {
            res.render("bookreviews", {
                error: err,
                data: results
            })
        })
    // res.send(`once implemented, you'll see all my books for: ${req.params.id}`);
};

exports.user_book_create = [
    body("title")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("author")
        .trim()
        .isLength({min: 1})
        .escape(),
    body("genre")
        .isLength({min: 1})
        .escape(),

    async(req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return;
        try {
            const book = new Books({
                title: req.body.title,
                author: req.body.author,
                id: 3,
                genre: req.body.genre
            });
            await book.save();
            res.redirect('/readers/1');
        } catch (error) {
          res.render('error', {error: error})  
        }
    },
];