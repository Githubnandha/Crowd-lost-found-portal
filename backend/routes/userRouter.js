const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.get("/", userController.greeting);

router.post(
  "/register",
  upload.single("profile_photo"),
  userController.registerUser
);

router.post("/login", userController.loginUser);

module.exports = router;
