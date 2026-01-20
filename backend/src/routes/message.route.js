import express from "express";
const router = express.Router();
router.get("/users", protectRoute, getUsersForSidebar)
router.get("/:id", protectRoute, getMessages)

export default router;