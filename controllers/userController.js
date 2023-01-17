const User = require("../models/users");

const async = require("async");

exports.user_list_get = (req, res) => {
  let currentUser;
  if (!req.user) {
    currentUser = {
      userId: 1,
      first_name: "Bob - test",
      last_name: "user",
    };
  } else currentUser = req.user;
  console.log(currentUser);
  async.parallel(
    {
      user_count(callback) {
        User.countDocuments({}, callback);
      },
      user_details(callback) {
        User.find({}, callback);
      },
    },
    (err, results) => {
      res.render("userDashboard", {
        error: err,
        data: results,
        currentUser: currentUser,
      });
    }
  );
};
