const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id:  { type: Number },
    email: { type: String },
    first_name: { type: String, required: true, maxLength: 30 },
    last_name: { type: String, required: true, maxLength: 30 },
    username: { type: String, required: true, maxLength: 10 }
})

module.exports = mongoose.model("User", UserSchema);