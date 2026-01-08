import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {

  res.on("finish", () => {

    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        query: req.query,
      },
      "HTTP Request"
    );
  });

  next();
};
