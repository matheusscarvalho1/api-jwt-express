import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { userRoutes } from "./routes/userRoutes";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { unprotectedRoutes } from "./routes/unprotectedRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);


app.use(loggerMiddleware);

app.use(healthRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(unprotectedRoutes)
// app.use("/protected")



export default app
