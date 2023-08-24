import express, { Router } from "express";

import {
  createUser,
  getAllUser,
  getCurrentUser,
  loginUser,
  tryMethod,
} from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/getMe", getCurrentUser);
userRouter.get("/try", tryMethod);

export default userRouter;
