const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    googleId: {type : String},
    email: { type: String },
    first_name: { type: String },
    last_name: { type: String }
})

module.exports = mongoose.model("User", UserSchema);