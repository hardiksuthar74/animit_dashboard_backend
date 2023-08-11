import express, { Router } from "express";

import { createUser, getAllUser } from "../controllers/userController";

const userRouter: Router = express.Router();

userRouter.get("/", getAllUser);
userRouter.post("/", createUser);

export default userRouter;
