import express from "express";
import { getProfile,updateProfile } from "../controllers/profileController.js";

const router = express.Router();

router.get("/infor/:id", getProfile); // Endpoint để lấy thông tin user theo ID
router.put("/update/:id", updateProfile); // Route cập nhật profile

export default router;
