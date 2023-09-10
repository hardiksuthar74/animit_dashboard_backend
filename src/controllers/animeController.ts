import multer, { Multer } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AnimeData } from "../services/JikanService";
import { AnimeService } from "../services/AnimeService";
import AppError from "../utils/appError";

const multerStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) => {
    cb(null, "src/public/animes");
  },
  filename: (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    // anime-animename-timestamp.extension
    const extension = file.mimetype.split("/")[1];
    cb(null, `anime-${req.body["title"]}-${Date.now()}.${extension}`);
  },
});

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: CallableFunction
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export const uploadAnimeImage = upload.single("image");

export const testRoutes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
  }
);

export const getAllAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const animes = await animeService.getAllAnimeData();

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);
export const deleteAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const { id } = req.body;

    const anime = await animeService.deleteAnimeData(id);

    res.status(200).json({
      status: "success",
      data: anime,
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
    const animeService = new AnimeService();

    const animes = await animeService.addAnimeMethod(req.body);

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);

export const addAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    if (req.file) {
      req.body.image = req.file.filename;
    }

    const anime = await animeService.addAnimeMethod(req.body);

    res.status(200).json({
      status: "success",
      data: anime,
    });
  }
);

export const updateAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    if (req.file) {
      req.body.image = req.file.filename;
    }

    const anime = await animeService.updateAnimeMethod(req.body);

    res.status(200).json({
      status: "success",
      data: anime,
    });
  }
);
