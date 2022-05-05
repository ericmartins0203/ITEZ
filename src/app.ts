import "reflect-metadata";
import express from "express";
import routes from "./routes";
import swaggerUiExpress from "swagger-ui-express";
import swaggerDocument from "./swagger.json";

const app = express();

app.use(express.json());
app.use(routes);

app.use("/", swaggerUiExpress.serve, swaggerUiExpress.setup(swaggerDocument));

export { app };
