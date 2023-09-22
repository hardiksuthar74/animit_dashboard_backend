import { NextFunction, Request, Response } from "express";
import { db } from "../database/db.server";
import { AnimeService } from "../services/AnimeService";
import Validator from "../utils/validator";
import AppError from "../utils/appError";

export const addAnime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // console.log(req.body);

  const { jikanAnimeId } = req.body;

  const validator = new Validator();

  validator.setData(req.body);
  validator.isRequired("jikanAnimeId");

  if (!validator.isValid()) {
    next(new AppError("form error", 400, validator.getErrors()));
  }

  const hasAnime = await db.anime.findFirst({
    where: { jikanAnimeId: jikanAnimeId },
  });

  if (!hasAnime) {
    const jikanService = new AnimeService();

    const addAnimeData = await jikanService.getAnimeDataByIdMethod(
      jikanAnimeId
    );

    const anime = await db.anime.create({
      data: {
        jikanAnimeId: parseInt(jikanAnimeId),
        title: addAnimeData.title,
        image: addAnimeData.image,
        type: addAnimeData.type,
        episodes: addAnimeData.episodes,
        status: addAnimeData.status,
        score: addAnimeData.score,
        popular: addAnimeData.popular,
        season: addAnimeData.season,
        synopsis: addAnimeData.synopsis,
        year: addAnimeData.year,
      },
    });
  }

  next();
};
