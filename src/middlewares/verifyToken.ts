import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new AppError("Invalid Token", 400);
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
    req["userId"] = decoded.id;
    next();
  } catch (error) {
    throw new AppError("Invalid Token", 400);
  }
};
