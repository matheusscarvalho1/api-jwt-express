import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./http/controllers/users/routes";
import { unprotectedRoutes } from "./http/controllers/unprotected/routes";
import { protectedRoutes } from "./http/controllers/protected/routes";
import { authRoutes } from "./http/controllers/authenticate/routes";

import cors from "cors";
import { healthRoutes } from "./http/controllers/health/routes";

dotenv.config();
const app = express();

// garente que todo body seja convertido em .json automaticamente
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

//Rotas
userRoutes(app);
unprotectedRoutes(app);
protectedRoutes(app);
authRoutes(app);
healthRoutes(app)

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send("Hello World!")
})

app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080");
});
