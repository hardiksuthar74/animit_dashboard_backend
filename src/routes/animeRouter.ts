import express, { Router } from "express";

import {
  getSearchedAnime,
  getSingleAnime,
  insertSingleAnime,
} from "../controllers/animeController";

const animeRouter: Router = express.Router();

animeRouter.post("/search", getSearchedAnime);
animeRouter.post("/singleanime", getSingleAnime);
animeRouter.post("/insertAnime", insertSingleAnime);

export default animeRouter;
