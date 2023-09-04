import express, { Router } from "express";

import { testRoute } from "../controllers/appController";

const appRouter: Router = express.Router();

appRouter.get("/test", testRoute);

export default appRouter;
