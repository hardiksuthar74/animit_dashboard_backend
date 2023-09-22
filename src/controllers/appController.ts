import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AppService } from "../services/AppService";
import { db } from "../database/db.server";
import Validator from "../utils/validator";
import AppError from "../utils/appError";

export const testRoute = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    res.status(200).json({
      status: "success",
      userId: userid,
    });
  }
);

export const addAnimeUser = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    const appService = new AppService(userid);

    const data = await appService.addAnimeMethod(req.body);

    res.status(200).json({
      status: "success",
      message: `This anime has been added`,
      data: data,
    });
  }
);

export const updateProcess = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    console.log(req.body);
    const userid = req["userId"];

    const validator = new Validator();
    validator.setData(req.body);

    validator.isRequired("process");
    validator.isRequired("id");
    validator.isRequired("episodes");

    if (!validator.isValid()) {
      return next(new AppError("form error", 400, validator.getErrors()));
    }

    const appService = new AppService(userid);

    const data = await appService.updateProcessStatus(req.body);

    res.status(200).json({
      status: "success",
      message: `This anime has been updated`,
      data: data,
    });
  }
);

export const addEpisodes = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    const appService = new AppService(userid);

    const data = await appService.addEpisodes(req.body);

    res.status(200).json({
      status: "success",
      message: `Watch more`,
      data: data,
    });
  }
);
