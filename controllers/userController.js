const User = require("../models/users");

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
    res.render("bookreviews");
    // res.send(`once implemented, you'll see all my books for: ${req.params.id}`);
};