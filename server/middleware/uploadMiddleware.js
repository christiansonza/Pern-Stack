// userRouter.js
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { register } = require("../controllers/userController");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

router.post("/register", upload.single("profile_pic"), register);

module.exports = router;
