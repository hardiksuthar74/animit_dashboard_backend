import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./middlewares/errorHandler";

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

app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
