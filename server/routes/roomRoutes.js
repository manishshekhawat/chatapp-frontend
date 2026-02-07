import express from "express";
import protect from "../middlewares/authMiddleware.js";
import {
  createRoom,
  getUserRooms
} from "../controllers/roomController.js";

const router = express.Router();

router.post("/", protect, createRoom);
router.get("/userrooms", protect, getUserRooms);
router.post("/init", protect, createRoom);


export default router;
