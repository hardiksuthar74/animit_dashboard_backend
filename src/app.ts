import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./middlewares/errorHandler";
import userRouter from "./routes/userRouter";
import jikanRouter from "./routes/jikanRouter";
import animeRouter from "./routes/animeRouter";

const app = express();

app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRouter);
app.use("/jikan", jikanRouter);
app.use("/animes", animeRouter);

app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
