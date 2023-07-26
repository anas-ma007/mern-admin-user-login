const User = require("../Models/userModel");
require("dotenv").config();

const loginAdmin = (req, res) => {
  const { email, password } = req.body;
  if (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  ) {
    res.json({ email, password });
  } else {
    res.status(401).json({ message: "Invalid Credentials" });
  }
};

const adminHome = async (req, res) => {
  const users = await User.find({});
  res.json({ users });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = name;
    user.email = email;

    await user.save();

    res.status(200).json({ user });
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    console.log("User not found");

    res.status(404);
    res.json({ message: "User not found" });
  }

  await user.deleteOne();
  const users = await User.find({});
  res.json({ user: users });
};

module.exports = {
  adminHome,
  updateUser,
  deleteUser,
  loginAdmin,
};
