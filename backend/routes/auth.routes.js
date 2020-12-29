const express = require("express");
const router = express.Router();
const { authUser } = require("../middleware/authUser");

const {
  registerUser,
  loginUser,
  generateNewTokens,
  protectedRoute,
} = require("../controllers/auth.controllers");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh", generateNewTokens);
router.get("/protected", authUser, protectedRoute);

module.exports = router;
