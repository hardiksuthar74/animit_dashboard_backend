import multer, { Multer } from "multer";
import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
// import { AnimeData } from "../services/JikanService";
import { AnimeService } from "../services/AnimeService";
import AppError from "../utils/appError";
import Validator from "../utils/validator";
import { existsSync, unlinkSync } from "fs";

const multerStorage = multer.diskStorage({
  destination: (
    req: Request,
    file: Express.Multer.File,
    cb: CallableFunction
  ) => {
    cb(null, "src/public/animebg");
  },
  filename: (req: Request, file: Express.Multer.File, cb: CallableFunction) => {
    // anime-animename-timestamp.extension
    const extension = file.mimetype.split("/")[1];
    cb(null, `animeSpotlight-${Date.now()}.${extension}`);
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

export const uploadAnimeImage = upload.single("coverImage");

export const getAllAnimes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const query = req.query;

    const animes = await animeService.getAllAnimeDataMethod(query);

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);

export const getAnimeByID = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const { animeId } = req.params;

    const anime = await animeService.getAnimeDataByIdMethod(animeId);

    res.status(200).json({
      status: "success",
      data: anime,
    });
  }
);

export const getAnimeRecommendations = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const { animeId } = req.params;

    const anime = await animeService.getAnimeRecommendationsMethod(animeId);

    res.status(200).json({
      status: "success",
      data: anime,
    });
  }
);

export const validateFields = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const validator = new Validator();

    validator.setData(req.body);
    validator.isRequired("jikanAnimeId").isRequired("rank");

    const isValid = validator.isValid();

    if (!isValid) {
      const errors = validator.getErrors();
      unlinkSync(`src/public/animebg/${req.file.filename}`);
      throw new AppError("form-error", 400, errors);
    }

    req.body["coverImage"] = req.file.filename;
    next();
  }
);

export const addSpotlightAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const anime = await animeService.addSpotlightAnimeMethod(req.body);

    res.status(200).json({
      status: "success",
      data: anime,
    });
  }
);

export const getAllSpotLightAnime = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const animeService = new AnimeService();

    const animes = await animeService.getAllSpotLightAnimeMethod();

    res.status(200).json({
      status: "success",
      data: animes,
    });
  }
);

// export const deleteAnime = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const animeService = new AnimeService();

//     const { id } = req.body;

//     const anime = await animeService.deleteAnimeData(id);

//     res.status(200).json({
//       status: "success",
//       data: anime,
//     });
//   }
// );

// export const getSpotlightAnime = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const animeService = new AnimeData();

//     const animes = await animeService.getFavouritestAnime();

//     res.status(200).json({
//       status: "success",
//       data: animes,
//     });
//   }
// );

// export const getTrendingAnime = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const animeService = new AnimeService();

//     const animes = await animeService.addAnimeMethod(req.body);

//     res.status(200).json({
//       status: "success",
//       data: animes,
//     });
//   }
// );

// export const addAnime = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const animeService = new AnimeService();

//     if (req.file) {
//       req.body.image = req.file.filename;
//     }

//     const anime = await animeService.addAnimeMethod(req.body);

//     res.status(200).json({
//       status: "success",
//       data: anime,
//     });
//   }
// );

// export const updateAnime = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const animeService = new AnimeService();

//     if (req.file) {
//       req.body.image = req.file.filename;
//     }

//     const anime = await animeService.updateAnimeMethod(req.body);

//     res.status(200).json({
//       status: "success",
//       data: anime,
//     });
//   }
// );
