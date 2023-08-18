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
    const { name, email, password, confirmPassword } = req.body;

    const validator = new Validator(req.body);

    validator
      .isRequired("name")
      .isRequired("email")
      .isRequired("password")
      .isRequired("confirmPassword")
      .isEmail("password");

    if (validator.isValid()) {
      const sameUser = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      if (sameUser) return next(new AppError("Email already in use", 400));

      const userData = await db.user.create({
        data: {
          name: name,
          email: email,
          password: hashPassword(password),
        },
      });

      const user: User = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      createSendToken(user, 201, req, res);
    } else {
      const errors: Record<string, string> = validator.getErrors();
      return next(new AppError("form error", 404, errors));
    }
  }
);

export const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, password } = req.body;

    const validator = new Validator(req.body);

    validator.isRequired("email").isRequired("password").isEmail("email");

    if (validator.isValid()) {
      const userData = await db.user.findUnique({
        where: {
          email: email,
        },
      });

      const canLogin: boolean = await verifyPassword(
        password,
        userData.password
      );

      if (!canLogin) {
        return next(new AppError("Email or Password Incorrect", 401));
      }

      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
      };

      createSendToken(user, 201, req, res);
    } else {
      const errors: Record<string, string> = validator.getErrors();
      return next(new AppError("form error", 404, errors));
    }
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
