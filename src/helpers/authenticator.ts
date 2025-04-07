import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function generateToken(userId: string) {
  if (!process.env.JWT_SECRET_KEY || !process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT secret key or refresh secret key not found.");
  }
  const accessToken = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });

  return { accessToken, refreshToken };
}
