import express, { Router } from "express";

import { getSearchedAnime } from "../controllers/animeController";

const animeRouter: Router = express.Router();

animeRouter.post("/search", getSearchedAnime);

export default animeRouter;
