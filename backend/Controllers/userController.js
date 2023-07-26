const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cloudinary = require("../Utils/cloudinary");
const asynchandler = require("express-async-handler");
const User = require("../Models/userModel");

const registerUser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
      profilePic: user.profilePic,
    });
  } else {
    res.status(400);
    throw new Error("Invalid User Data");
  }
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
      profilePic: user.profilePic,
    });
  } else {
    res.status(402);
    throw new Error("Invalid Credentials");
  }
  res.json({ messaage: "Login User" });
});

const getMe = asynchandler(async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(200).json({
    _id: _id,
    name,
    email,
  });
});

const uploadPic = asynchandler(async (req, res) => {
  // console.log("this is req.body :", req)
  let result = await cloudinary.uploader.upload(req.file.path);
  if (result.url) {
    const user = await User.findById(req.params.id);
    user.profilePic = result.url;
    await user.save();
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generatetoken(user._id),
      profilePic: user.profilePic,
    });
  } else {
    console.log("image upload failed");
  }
});

const generatetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  uploadPic,
};
