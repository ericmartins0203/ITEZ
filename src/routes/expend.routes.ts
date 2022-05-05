import { Router } from "express";

import {
  createExpendController,
  deleteExpendController,
  getExpendController,
  updateExpendController,
} from "../controllers/expend";
import { authToken } from "../middlewares/authToken.middleware";
import { validateShape } from "../middlewares/validateShape.middleware";
import { validType } from "../middlewares/validType.middleware";
import { ExpendShape, UpdateExpendShape } from "../shape/expend.shape";

const ExpendRoutes = Router();

ExpendRoutes.post(
  "/user/expend",
  authToken,
  validateShape(ExpendShape),
  validType,
  createExpendController
);

ExpendRoutes.get("/user/expend", authToken, getExpendController);

ExpendRoutes.patch(
  "/user/expend/:id",
  authToken,
  validateShape(UpdateExpendShape),
  updateExpendController
);

ExpendRoutes.delete("/user/expend/:id", authToken, deleteExpendController);

export default ExpendRoutes;
