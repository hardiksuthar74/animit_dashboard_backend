import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AnimeData } from "../services/JikanService";

export const testRoutes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
  }
);

export const getAllAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeData();

    const animes = await animeService.getAllAnime(req.query);

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);

export const getSpotlightAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeData();

    const animes = await animeService.getFavouritestAnime();

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);

export const getTrendingAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeData();

    const animes = await animeService.getTrendingAnime();

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);
