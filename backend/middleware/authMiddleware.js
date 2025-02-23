import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Avtorizatsiya talab qilinadi!" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Noto‘g‘ri yoki eskirgan token!" });
  }
};

export default authMiddleware;
