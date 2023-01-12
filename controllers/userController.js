const User = require("../models/users");
const Review = require("../models/bookreviews");
const Books = require("../models/books");
const { body, validationResult } = require("express-validator");

const async = require("async");

exports.user_list = (req, res) => {
    let currentUser;
    if(!req.user) {
        currentUser = {
            userId: 1,
            first_name: 'Bob - test',
            last_name: 'user'

        }
    }
    else currentUser = req.user;
    console.log(currentUser);
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
                currentUser: currentUser
            });
        }
    );
};

exports.user_books = (req, res) => {
    const currentUser = req.user;
    const params = req.params.id;
    async.parallel(
        {
             reader_name(callback) {
                User.find({userId: params}, {first_name: 1, last_name: 1}, callback).distinct("first_name");
             },
             book_detail(callback) {
                Review.aggregate([
                    { $lookup:
                        {
                           from: "books",
                           localField: "book",
                           foreignField: "_id",
                           as: "bookinfo"
                        }
                    },
                    { $lookup:
                        {
                           from: "users",
                           localField: "user",
                           foreignField: "_id",
                           as: "userinfo"
                        }
                    },
                    { $match :
                        {
                            $and: [{ "userinfo.userId" : Number(params)}] 
                        }
                    },
                    { $project: {
                        "userinfo.userId": 1,
                        "bookinfo.title": 1,
                        "bookinfo.author": 1,
                        "bookinfo.genre": 1,
                        dateMonthYear: { $dateToString: { format: "%m/%d/%Y", date: "$date_added" } },
                        rating: 1,
                        own_copy: 1,
                        date_added: 1,
                        comments: 1
                        }
                    }
                ], callback)
            }
        },
        (err, results) =>  {
            console.log(results);
            res.render('bookreviews', {
                id: params, 
                data: results, 
                error: err,
                currentUser: currentUser
            })
        }
    )
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
                own_copy: req.body.ownit,
                comments: req.body.comments
            })
            await review.save();
            res.redirect(`/readers/${req.params.id}`);
        } catch (error) {
            res.render('error', {error: error})
        }
    }
];

exports.user_book_delete = (req, res) => {
    console.log(req.body);
}