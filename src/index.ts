import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./http/controllers/users/routes";
import { unprotectedRoutes } from "./http/controllers/unprotected/routes";
import { protectedRoutes } from "./http/controllers/protected/routes";
import { authRoutes } from "./http/controllers/authenticate/routes";

dotenv.config();
const app = express();
// garente que todo body seja convertido em .json automaticamente
app.use(express.json());

userRoutes(app);
unprotectedRoutes(app);
protectedRoutes(app);
authRoutes(app);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
