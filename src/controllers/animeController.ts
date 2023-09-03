import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";

export const testRoutes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log("hello");
  }
);
