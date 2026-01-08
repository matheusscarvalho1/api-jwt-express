import { Response, NextFunction } from "express";
import { RequestJWT } from "../@types/customRequest-jwt";
import jwt from "jsonwebtoken";
import IJwtPayload from "../interfaces/IJwtPayload";
import { InvalidCredentialsError } from "../utils/errors/invalid-credentials-error";

const authMiddleware = (
  req: RequestJWT,
  res: Response,
  next: NextFunction
) => {
   if (!process.env.JWT_SECRET_KEY) {
    return res.status(500).json({ message: "JWT secret key not found." });
  }

  try {
    const authHeader = req.headers.authorization;

     if (!authHeader) {
      throw new InvalidCredentialsError();
    }

    const accessToken = authHeader.startsWith("Bearer ") 
      ? authHeader.split(" ")[1] 
      : authHeader;

    const tokenPayload = jwt.verify(accessToken, process.env.JWT_SECRET_KEY) as IJwtPayload;

    req.user = { sub: tokenPayload.userId };

    next();
  } catch (error) {

    console.error(error);

    if (error instanceof InvalidCredentialsError) {
    return res.status(401).json({ message: error.message });
  }

  if (error instanceof Error && (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError")) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export default authMiddleware;
