import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./controllers/users/routes";
import { unprotectedRoutes } from "./controllers/unprotected/routes";
import { protectedRoutes } from "./controllers/protected/routes";
import { authRoutes } from "./controllers/authenticate/routes";

import cors from "cors";
import { healthRoutes } from "./controllers/health/routes";

dotenv.config();
const app = express();

// garente que todo body seja convertido em .json automaticamente
app.use(express.json());
app.use(
  cors({
    origin: "*",
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


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running...");
});
