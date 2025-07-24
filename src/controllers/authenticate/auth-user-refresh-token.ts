import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";
import { generateToken } from "../../helpers/authenticator";
import IJwtPayLoad from "../../entities/interface/IJwtPayLoad";

const authUserRefreshToken = async (req: Request, res: Response) => {
  try {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error("JWT refresh secret not found.");
    }

    const { refreshToken } = req.body;

    const tokenPayload = jwt.verify(
      refreshToken,
      process.env.JWT_REFRESH_SECRET
    ) as IJwtPayLoad;

    const tokens = generateToken(tokenPayload.userId);
    res.status(200).json(tokens);
  } catch (error) {
    console.error(error);

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    res.status(500).json({ message: "Internal Server Error" });
  }
};

export default authUserRefreshToken;
