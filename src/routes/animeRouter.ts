import express, { Router } from "express";

import { testRoutes } from "../controllers/animeController";
import { isUserHardik } from "../middlewares/isUserHardik";

const animeRouter: Router = express.Router();

animeRouter.get("/", isUserHardik, testRoutes);

export default animeRouter;
