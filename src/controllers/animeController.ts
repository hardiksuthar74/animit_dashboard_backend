import { NextFunction, Request, Response } from "express";
import { AnimeData } from "../services/AnimeService";

export const getSearchedAnime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const animeData = new AnimeData();

  const { anime } = req.body;

  //   console.log(req.body);

  const searchedData = await animeData.fetchJikanData(anime);

  res.status(200).json({
    status: "success",
    data: searchedData,
  });
};

export const getSingleAnime = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const animeData = new AnimeData();

  const { animeid } = req.body;

  const searchedData = await animeData.fetchSingleAnime(animeid);

  res.status(200).json({
    status: "success",
    data: searchedData,
  });
};
