import bodyParser from "body-parser";
import express from "express";
import { Controller } from "./types/general.js";
import { errorMiddleware } from "./middleware/error.js";
import { MonitoringController } from "./controllers/monitoring.js";
import AuthenticationController from "./controllers/authentication.js";

const app: express.Application = express();

// middlewares
app.use(bodyParser.json());

// public
app.use("/public", express.static("public"));

// health
const monitoring = new MonitoringController();
app.use("/", monitoring.router);

// api
const controllers: Controller[] = [new AuthenticationController()];
controllers.forEach((controller) => {
  app.use("/api/v1", controller.router);
});

// error middleware
app.use(errorMiddleware);

// start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("App listening on the port " + PORT);
});
