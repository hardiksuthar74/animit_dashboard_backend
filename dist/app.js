"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const animeRouter_1 = __importDefault(require("./routes/animeRouter"));
const app = (0, express_1.default)();
exports.app = app;
app.use(express_1.default.json());
app.use(express_1.default.static(`${__dirname}/public`));
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use("/users", userRouter_1.default);
app.use("/animes", animeRouter_1.default);
app.all("*", (req, res, next) => {
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(errorHandler_1.default);
//# sourceMappingURL=app.js.map