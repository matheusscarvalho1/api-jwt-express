import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import IJwtPayload from "./IJwtPayLoad";

// Middleware de autenticação
const authMiddleware: RequestHandler = (req, res, next) => {
  if (!process.env.JWT_SECRET_KEY) {
    res.status(500).json({ message: "JWT secret key not found." });
    return;
  }

  try {
    const accessToken = req.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const tokenPayload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    ) as IJwtPayload;

    (req as any).user = { sub: tokenPayload.userId }; // Definindo 'sub' como userId

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
