import { Router } from "express";
import authUser from "../controllers/auth/AuthController";
import authUserRefreshToken from "../controllers/auth/refreshTokenController";

const router = Router();
 

router.post("/api/v1/auth/user", authUser);
router.post("/api/v1/auth/user/refresh-token", authUserRefreshToken);

export { router as authRoutes };

