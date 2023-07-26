const express = require("express");
const upload = require('../Utils/multer')
const router = express.Router();
const {
  registerUser,
  loginUser,
  getMe,
  uploadPic,
} = require("../Controllers/userController");
const { protect } = require("../Middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.post("/imageUpload/:id", upload.single("image"), uploadPic);

module.exports = router;
