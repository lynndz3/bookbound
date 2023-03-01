const User = require("../models/users");
const Followers = require("../models/followers");

const async = require("async");

exports.user_list_get = (req, res) => {
  let currentUser;
  if (!req.user) {
    currentUser = {
      userId: 1,
      _id: '63bf230a32f4587464eebb52',
      first_name: "Bob - test",
      last_name: "user",
    };
  } else currentUser = req.user;
    async.parallel(
      {
        user_followers(callback) {
          Followers.findOneAndUpdate({ user : currentUser._id},
            { $set: {user: currentUser._id} }, 
              {
                new: true,
                upsert: true
            },
            callback
            );
        },
      user_count(callback) {
        User.countDocuments({}, callback);
      },
      user_details(callback) {
        User.find({}, callback);
      },
      friend_list(callback) {
        Followers.aggregate([
          {
             $lookup: {
                 from: "users",
                 localField: "following",
                 foreignField: "userId",
                 as: "following_details"
             },
         },
         {
             $lookup: {
                 from: "users",
                 localField: "user",
                 foreignField: "_id",
                 as: "user_info"
             },
         },
         {
             $match: {
                 $and: [{"user_info.userId": currentUser.userId}]
             }
         },
         {
             $project: {
               "user_info.userId": 1,
               "user_info.first_name": 1,
                "following_details.userId": 1,
                "following_details.first_name": 1,
                "following_details.last_name": 1
             }
           }
         ],
          callback
        );
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


exports.friend_find_get = (req, res) => {
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
      user_details(callback) {
        User.find({}, callback);
      },
      already_following(callback) {
        Followers.aggregate([
          {
             $lookup: {
                 from: "users",
                 localField: "following",
                 foreignField: "userId",
                 as: "following"
             },
         },
         {
             $lookup: {
                 from: "users",
                 localField: "user",
                 foreignField: "_id",
                 as: "user_info"
             },
         },
         {
             $match: {
                 $and: [{"user_info.userId": currentUser.userId}]
             }
         },
         {
             $project: {
                "following.userId": 1,
             }
           }
         ],
          callback
        );
      }
    },
    (err, results) => {
      res.render("findfriends", {
        error: err,
        data: results,
        currentUser: currentUser,
      });
    }
  );
};


exports.follow_friend = [
  async (req, res) => {
    let currentUserId;
      if (!req.user) {
       currentUserId = '63bf230a32f4587464eebb52'
      }
      else currentUserId = req.user._id;
   const filter = { user : currentUserId};
   try {
    const newFollower = await Followers.findOneAndUpdate(filter,
      { $push: {following: req.body.friendId} }, 
        {
          new: true,
          upsert: true
      })
      console.log("new follower is added " + newFollower);
  } catch (error) {
    res.render("error", { error: error });
  }
    res.redirect(`/readers/follow`);
  }
];