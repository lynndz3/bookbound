const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowersSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  following: [ {type: Number} ],
})

module.exports = mongoose.model("Followers", FollowersSchema, "followers");