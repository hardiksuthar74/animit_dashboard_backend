import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { AppService } from "../services/AppService";

export const testRoute = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    res.status(200).json({
      status: "success",
      userId: userid,
    });
  }
);

export const addAnime = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    const appService = new AppService(userid);
  }
);
