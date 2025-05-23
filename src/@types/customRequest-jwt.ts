import { Request } from "express";

export interface RequestJWT extends Request {
  user?: {
    sub: string;
  };
}
