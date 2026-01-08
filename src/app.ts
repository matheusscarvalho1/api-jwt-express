import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { userRoutes } from "./routes/userRoutes";
import { loggerMiddleware } from "./middleware/loggerMiddleware";

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
// app.use("/unprotected")
// app.use("/protected")



export default app
