import express, { Router } from "express";

import {
  addAnimeUser,
  addEpisodes,
  testRoute,
  updateProcess,
} from "../controllers/appController";
import { addAnime } from "../middlewares/addAnime";

const appRouter: Router = express.Router();

appRouter.get("/test", testRoute);
appRouter.post("/addAnime", addAnime, addAnimeUser);
appRouter.post("/updateProcess", updateProcess);
// appRouter.post("/addEpisodes", addEpisodes);

export default appRouter;
