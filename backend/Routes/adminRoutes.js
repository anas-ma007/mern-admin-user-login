const express = require("express");
const router = express.Router();
const {
  adminHome,
  updateUser,
  deleteUser,
  loginAdmin,
} = require("../Controllers/adminController");

router.get("/", adminHome);
router.post("/login", loginAdmin);
router.put("/:id", updateUser);
router.delete("/remove/:id", deleteUser);

module.exports = router;
