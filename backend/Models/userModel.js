const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "Please add your name"],
    },
    email: {
      type: "String",
      required: [true, "Please add your email"],
      unique: true,
    },
    password: {
      type: "String",
      required: [true, "Please add your pasword"],
    },
    profilePic: {
      type: "String",
      default: "https://img.freepik.com/free-icon/user_318-159711.jpg",
    }
  },
  {
    timestamp: true,
  }
);

module.exports = mongoose.model("User", userSchema);
