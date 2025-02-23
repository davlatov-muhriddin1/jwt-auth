import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(`${process.env.CLIENT_URL} urllllllllllll`);

  // Oddiy foydalanuvchi tekshiruvi
  if (username !== "user1" || password !== "password123") {
    return res.status(401).json({ message: "Login yoki parol noto‘g‘ri!" });
  }

  const token = jwt.sign(
    { username, email: "mdavlatov@gmail.com" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.json({ message: "Login muvaffaqiyatli!" });
});

router.post("/logout", (req, res) => {
  res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "None" });
  res.json({ message: "Logout qilindi!" });
});

export default router;
