const User = require("../models/users");
const Books = require("../models/books");

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