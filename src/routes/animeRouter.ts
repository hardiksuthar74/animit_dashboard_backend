import express, { Router } from "express";

import {
  getSearchedAnime,
  getSingleAnime,
} from "../controllers/animeController";

const animeRouter: Router = express.Router();

animeRouter.post("/search", getSearchedAnime);
animeRouter.post("/singleanime", getSingleAnime);

export default animeRouter;
