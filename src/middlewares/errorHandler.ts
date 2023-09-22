import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const sendErrorDev = (err: AppError, res: Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      error: err.errorData,
    });
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
      error: err.errorData,
    });
  }
};

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  sendErrorDev(err, res);
};

export default globalErrorHandler;
