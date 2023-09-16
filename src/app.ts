import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import globalErrorHandler from "./middlewares/errorHandler";
import userRouter from "./routes/userRouter";
import jikanRouter from "./routes/jikanRouter";
import animeRouter from "./routes/animeRouter";
// import appRouter from "./routes/appRouter";
import compression from "compression";
import { verifyToken } from "./middlewares/verifyToken";

const app = express();

app.use(compression());
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
// app.use("/jikan", jikanRouter);
app.use("/animes", animeRouter);
// app.use("/app", verifyToken, appRouter);

app.all("*", (req: Request, res: Response, next: NextFunction): void => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export { app };
