import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { refreshTokenService } from "../../services/auth/refreshTokenService";


const authUserRefreshToken = async (req: Request, res: Response) => {
  
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
      return res.status(400).json({
        message: "Refresh token is required",
      });
    }

      const tokens = refreshTokenService(refreshToken);

      return res.status(200).json(tokens);
    } catch (error) {
      console.error(error);

      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ message: "Unauthorized" });
        
      }

      return res.status(500).json({ message: "Internal Server Error" });
    }
};

export default authUserRefreshToken;
