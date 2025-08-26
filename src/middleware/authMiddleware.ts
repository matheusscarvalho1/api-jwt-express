import { Response, NextFunction } from "express";
import { RequestJWT } from "../@types/customRequest-jwt";
import jwt from "jsonwebtoken";
import IJwtPayload from "../interface/IJwtPayLoad";

const authMiddleware = (
  req: RequestJWT,
  res: Response,
  next: NextFunction
): void => {
  if (!process.env.JWT_SECRET_KEY) {
    res.status(500).json({ message: "JWT secret key not found." });
    return;
  }

  try {
    
    const accessToken = req.cookies?.accessToken || req.headers.authorization?.split("Bearer ")[1];

    if (!accessToken) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const tokenPayload = jwt.verify(
      accessToken,
      process.env.JWT_SECRET_KEY
    ) as IJwtPayload;

    req.user = { sub: tokenPayload.userId };

    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default authMiddleware;
