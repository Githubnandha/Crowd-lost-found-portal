const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const auth = require("../middleware/auth");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post(
  "/post-item",
  auth.authenticateToken,
  upload.single("item_photo"),
  itemController.postLostItem
);
router.get(
  "/get-all-items",
  auth.authenticateToken,
  itemController.getAllItems
);

module.exports = router;
