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

    const data = await appService.addAnimeMethod(req.body);

    let processMsg = "";

    if (data.process == 0) processMsg = "WatchList";
    if (data.process == 1) processMsg = "Hold";
    if (data.process == 2) processMsg = "Plan to watch";
    if (data.process == 3) processMsg = "Dropped";
    if (data.process == 4) processMsg = "Completed";

    res.status(200).json({
      status: "success",
      message: `This anime has been added to ${processMsg}`,
      data: data,
    });
  }
);

export const updateProcess = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const userid = req["userId"];

    const appService = new AppService(userid);

    const data = await appService.updateProcessStatus(req.body);

    let processMsg = "";

    if (data.process == 0) processMsg = "WatchList";
    if (data.process == 1) processMsg = "Hold";
    if (data.process == 2) processMsg = "Plan to watch";
    if (data.process == 3) processMsg = "Dropped";
    if (data.process == 4) processMsg = "Completed";

    res.status(200).json({
      status: "success",
      message: `This anime has been added to ${processMsg}`,
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
