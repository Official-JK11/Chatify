import express from "express";
const router = express.Router();
router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)
router.post("/user/:id", protectRoute, sendMessage)

export default router;