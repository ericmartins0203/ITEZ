import { Router } from "express";
import {
  createReceivedController,
  deleteReceivedController,
  getReceivedController,
  UpdateReceivedController,
} from "../controllers/received";

import { authToken } from "../middlewares/authToken.middleware";
import { validateShape } from "../middlewares/validateShape.middleware";
import { ReceivedShape, UpdateReceivedShape } from "../shape/received.shape";

const ReceivedRoutes = Router();

ReceivedRoutes.post(
  "/user/received",
  authToken,
  validateShape(ReceivedShape),
  createReceivedController
);

ReceivedRoutes.get("/user/received", authToken, getReceivedController);

ReceivedRoutes.patch(
  "/user/received/:id",
  authToken,
  validateShape(UpdateReceivedShape),
  UpdateReceivedController
);

ReceivedRoutes.delete(
  "/user/received/:id",
  authToken,
  deleteReceivedController
);

export default ReceivedRoutes;
