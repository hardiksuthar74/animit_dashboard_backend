import { NextFunction, Request, Response } from "express";
import { db } from "../database/db.server";
import AppError from "../utils/appError";
import isValidEmail from "../utils/authHelper";

export const getAllUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const allUser = await db.user.findMany();

  res.status(200).json({
    success: true,
    data: allUser,
  });
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name) return next(new AppError("Name is required", 400));
  if (!email) return next(new AppError("Email is required", 400));
  if (!isValidEmail(email))
    return next(new AppError("Please provide a valide Email", 400));
  if (!password || !confirmPassword)
    return next(new AppError("Password is required", 400));
  if (password !== confirmPassword)
    return next(
      new AppError("Password and confirm password should be same", 400)
    );

  const sameUser = await db.user.findUnique({
    where: {
      email: email,
    },
  });

  if (sameUser) return next(new AppError("Email already in use", 400));

  const user = await db.user.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  res.status(200).json({
    success: true,
    data: user,
  });
};
