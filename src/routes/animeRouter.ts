import express, { Router } from "express";

import {
  getAllAnime,
  getSpotlightAnime,
  getTrendingAnime,
  testRoutes,
} from "../controllers/animeController";
import { isUserHardik } from "../middlewares/isUserHardik";

const animeRouter: Router = express.Router();

animeRouter.get("/", getAllAnime);
animeRouter.get("/favourites", getSpotlightAnime);
animeRouter.get("/trending", getTrendingAnime);

export default animeRouter;
