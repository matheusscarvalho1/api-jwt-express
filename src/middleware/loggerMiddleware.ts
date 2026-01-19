import { Request, Response, NextFunction } from "express";
import requestIp from "request-ip";
import logger from "../utils/logger";

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const clientIp = requestIp.getClientIp(req);

  res.on("finish", () => {

    logger.info(
      {
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        query: req.query,
        ip: clientIp
      },
      "HTTP Request"
    );
  });

  next();
};
