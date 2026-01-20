import express from "express";
import cors from "cors";

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

import { authRoutes } from "./routes/authRoutes";
import { healthRoutes } from "./routes/healthRoutes";
import { userRoutes } from "./routes/userRoutes";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import { unprotectedRoutes } from "./routes/unprotectedRoutes";
import { protectedRoutes } from "./routes/protectedRoutes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AuthSystem APIs (Back-End) — Node.js (Express), Swagger & TypeScript',
      version: '1.0.0',
      description: 'Documentação da API com Node.js (Express) utilizando TypeScript com rotas protegidas JWT',
       contact: {
        name: "Matheus Carvalho",
        url: "https://matheusscarvalho-dev.onrender.com/",
      },
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Servidor de Desenvolvimento',
      },
      {
        url: 'https://api-jwt-express.onrender.com',
        description: 'Servidor de Produção (Render)',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts', './src/app.ts'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use(loggerMiddleware);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(healthRoutes)
app.use(authRoutes)
app.use(userRoutes)
app.use(unprotectedRoutes)
app.use(protectedRoutes)



export default app
