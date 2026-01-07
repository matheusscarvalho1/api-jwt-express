import express from "express";
import cors from "cors";
import { authRoutes } from "./routes/authRoutes";
import { healthRoutes } from "./routes/healthRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

app.use(healthRoutes)
app.use(authRoutes)
//app.use("/user")
// app.use("/unprotected")
// app.use("/protected")

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

export default app
