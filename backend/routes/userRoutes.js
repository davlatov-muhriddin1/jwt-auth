import express from "express";
import authMiddleware from "../middleware/authMiddleware.js"; // Middleware orqali tokenni tekshiramiz

const router = express.Router();

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: `Salom, ${req.user.username}!, Email: ${req.user.email}`,
  });
});

export default router;
