import jwt from "jsonwebtoken";
import { generateToken } from "../../helpers/authenticator";
import IJwtPayLoad from "../../interfaces/IJwtPayload";
import { SecretError } from "../../utils/errors/secret-error";
import { InvalidTokenError } from "../../utils/errors/invalid-token-error";

export const refreshTokenService = (refreshToken: string) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new SecretError();
  }

  try {
    const tokenPayload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as IJwtPayLoad;

    return generateToken(tokenPayload.userId);
    
  } catch (error) {
    if (
      error instanceof jwt.JsonWebTokenError || 
      error instanceof jwt.TokenExpiredError
    ) {
      throw new InvalidTokenError();
    }

    throw error;
  }
};
