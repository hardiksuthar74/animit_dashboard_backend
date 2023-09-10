import express, { Router } from "express";
import multer from "multer";

import {
  deleteAnime,
  getAllAnime,
  getSpotlightAnime,
  getTrendingAnime,
  addAnime,
  uploadAnimeImage,
  updateAnime,
} from "../controllers/animeController";

const animeRouter: Router = express.Router();

animeRouter.get("/", getAllAnime);
animeRouter.post("/", uploadAnimeImage, addAnime);
animeRouter.post("/update", uploadAnimeImage, updateAnime);
animeRouter.post("/delete", deleteAnime);
animeRouter.get("/favourites", getSpotlightAnime);
animeRouter.get("/trending", getTrendingAnime);

export default animeRouter;
