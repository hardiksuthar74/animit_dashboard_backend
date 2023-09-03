import express, { Router } from "express";

import {
  getSearchedAnime,
  getSingleAnime,
  insertSingleAnime,
} from "../controllers/jikanController";

const jikanRouter: Router = express.Router();

jikanRouter.post("/search", getSearchedAnime);
jikanRouter.post("/singleanime", getSingleAnime);
jikanRouter.post("/insertAnime", insertSingleAnime);

export default jikanRouter;
