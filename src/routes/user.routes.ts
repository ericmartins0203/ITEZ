import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  loginUserController,
  updateUserController,
} from "../controllers/user";
import { authToken } from "../middlewares/authToken.middleware";
import { validateShape } from "../middlewares/validateShape.middleware";
import { LoginShape, UserShape, UpdateUserShape } from "../shape/User.shape";

const userRoutes = Router();

userRoutes.post("/user/signup", validateShape(UserShape), createUserController);
userRoutes.post("/user/signin", validateShape(LoginShape), loginUserController);

userRoutes.get("/user", authToken, getUserController);

userRoutes.patch(
  "/user",
  authToken,
  validateShape(UpdateUserShape),
  updateUserController
);

userRoutes.delete("/user", authToken, deleteUserController);

export default userRoutes;
