import express from "express";
import dotenv from "dotenv";
import { userRoutes } from "./http/controllers/usuarios/routes";

dotenv.config();
const app = express();

// garente que todo body seja convertido em .json automaticamente
app.use(express.json());
userRoutes(app);

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
