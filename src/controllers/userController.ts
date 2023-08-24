import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { db } from "../database/db.server";
import AppError from "../utils/appError";

import {
  isValidEmail,
  hashPassword,
  verifyPassword,
} from "../utils/authHelper";
import Validator from "../utils/validator";
import catchAsync from "../utils/catchAsync";
import { UserFacade } from "../services/UserRepository";
// import { UserRepository } from "../services/UserRepository";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Decoded {
  id: number;
  iat: number;
  exp: number;
}

const signToken = (id: number): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (
  user: User,
  statusCode: number,
  req: Request,
  res: Response
) => {
  const token = signToken(user.id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      ...user,
      isLogin: true,
    },
  });
};

export const getAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allUser = await db.user.findMany();

    res.status(200).json({
      success: true,
      data: allUser,
    });
  }
);

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userFacade = new UserFacade();

    const userData = await userFacade.createUser(req.body);

    const user: User = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    createSendToken(user, 201, req, res);
  }
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userFacade = new UserFacade();

    const userData = await userFacade.loginUser(req.body);

    const user = {
      id: userData.id,
      name: userData.name,
      email: userData.email,
    };

    createSendToken(user, 201, req, res);
  }
);

export const getCurrentUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let token: string;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as any;
      const userData = await db.user.findUnique({
        where: {
          id: decoded.id,
        },
      });

      if (!userData) {
        return next(
          new AppError(
            "The user belonging to this token does no longer exist.",
            401
          )
        );
      }

      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      res.status(200).json({
        status: "success",
        isLogin: true,
        data: {
          ...user,
        },
      });
    } catch (error) {
      return next(new AppError("Invalid Token", 400));
    }
  }
);

export const tryMethod = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const userFacade = new UserFacade();

    const data = await userFacade.createUser(req.body);

    res.status(200).json({
      data: data,
    });
  }
);
