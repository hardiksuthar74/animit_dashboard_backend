import express, { Router } from "express";
import multer from "multer";

import {
  addSpotlightAnime,
  getAllAnimes,
  getAllSpotLightAnime,
  getAnimeByID,
  getAnimeRecommendations,
  uploadAnimeImage,
  validateFields,
} from "../controllers/animeController";

const animeRouter: Router = express.Router();

animeRouter.get("/spotlight", getAllSpotLightAnime);
animeRouter.get("/", getAllAnimes);
animeRouter.get("/:animeId", getAnimeByID);
animeRouter.get("/:animeId/recommendations", getAnimeRecommendations);
animeRouter.post(
  "/spotlight",
  uploadAnimeImage,
  validateFields,
  addSpotlightAnime
);
// animeRouter.post("/", uploadAnimeImage, addAnime);
// animeRouter.post("/update", uploadAnimeImage, updateAnime);
// animeRouter.post("/delete", deleteAnime);
// animeRouter.get("/favourites", getSpotlightAnime);
// animeRouter.get("/trending", getTrendingAnime);

export default animeRouter;
