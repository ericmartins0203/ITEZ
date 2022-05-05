import { Router } from "express";
import ExpendRoutes from "./expend.routes";
import ReceivedRoutes from "./received.routes";
import userRoutes from "./user.routes";

const routes: Array<Router> = [userRoutes, ReceivedRoutes, ExpendRoutes];

export default routes;
