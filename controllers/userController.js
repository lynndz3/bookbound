const User = require("../models/users");
const Review = require("../models/bookreviews");
const Books = require("../models/books");
const { body, validationResult } = require("express-validator");


const async = require("async");

exports.user_list = (req, res) => {
    async.parallel(
        {
            user_count(callback) {
                User.countDocuments({}, callback);
            },
            user_details(callback) {
                User.find({}, callback);
            }
        },
        (err, results) => {
            res.render("users", {
                error: err,
                data: results,
                user: req.user
            });
        }
    );
};

exports.user_books = (req, res) => {
    const currentUser = req.user;
    const params = req.params.userId;
    async.parallel (
        {
            book_count() {
                Books.countDocuments({});
            },
            // book_detail() {
            //     Review.aggregate([
            //         { $lookup:
            //             {
            //                from: "books",
            //                localField: "book",
            //                foreignField: "_id",
            //                as: "bookinfo"
            //             }
            //         }
            //     ])
            // },
            // reader_name(callback) {
            //     User.find({userId: params}, {first_name: 1, last_name: 1}, callback).distinct("first_name");
            // }
        },
        (err, results) => {
            res.render("bookreviews", {
                user: currentUser,
                error: err,
                data: results,
                params: params
            })
        })
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
    body("rating")
        .isLength({min: 1})
        .escape(),

    async(req, res) => {
        const errors = validationResult(req);
        const currentUser = req.user;
        console.log(req.body);
        console.log(currentUser);
        if (!errors.isEmpty()) return;
        try {
                const book = new Books({
                title: req.body.title,
                author: req.body.author,
                genre: req.body.genre
            });
            newBook = await book.save();
        } catch (error) {
          res.render('error', {error: error})  
        }
        console.log("new book added is " + newBook);
        try {
            const review = new Review({
                book: newBook._id,
                user: currentUser._id,
                rating: req.body.rating,
                own_copy: req.body.ownit
            })
            await review.save();
            res.redirect('/readers/LynnZukerman');
        } catch (error) {
            res.render('error', {error: error})
        }
    }
];