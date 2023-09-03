import { NextFunction, Request, Response } from "express";

const isUserHardik = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("hello from middleware");
  next();
};

export { isUserHardik };
