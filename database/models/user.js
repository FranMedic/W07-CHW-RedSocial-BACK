const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
  },
  enemies: {
    type: [Types.ObjectId],
    ref: "Users",
    required: true,
  },
  friends: {
    type: [Types.ObjectId],
    ref: "Users",
    required: true,
  },
  bio: {
    type: String,
  },
});

const User = model("User", userSchema, "Users");

module.exports = User;
