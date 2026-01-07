import jwt from "jsonwebtoken";
import { generateToken } from "../../helpers/authenticator";
import IJwtPayLoad from "../../interfaces/IJwtPayload";

export const refreshTokenService = (refreshToken: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT refresh secret not found.");
  }

  try {
    const tokenPayload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as IJwtPayLoad;

    return generateToken(tokenPayload.userId);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw error;
    }

    throw new Error("Invalid refresh token");
  }
};
