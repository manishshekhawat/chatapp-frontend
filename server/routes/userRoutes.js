import express from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  searchUsers,
  logoutUser
} from "../controllers/userController.js";

import protect from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getProfile);
router.get("/search", protect, searchUsers);
router.get("/logout", logoutUser);

export default router;
