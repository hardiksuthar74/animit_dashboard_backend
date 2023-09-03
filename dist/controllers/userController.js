"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryMethod = exports.getCurrentUser = exports.loginUser = exports.createUser = exports.getAllUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_server_1 = require("../database/db.server");
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
const UserRepository_1 = require("../services/UserRepository");
const signToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
};
const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.id);
    res.status(statusCode).json({
        status: "success",
        token,
        data: Object.assign(Object.assign({}, user), { isLogin: true }),
    });
};
exports.getAllUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const allUser = yield db_server_1.db.user.findMany();
    res.status(200).json({
        success: true,
        data: allUser,
    });
}));
exports.createUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFacade = new UserRepository_1.UserFacade();
    const userData = yield userFacade.createUser(req.body);
    const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    };
    createSendToken(user, 201, req, res);
}));
exports.loginUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFacade = new UserRepository_1.UserFacade();
    const userData = yield userFacade.loginUser(req.body);
    const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email,
    };
    createSendToken(user, 201, req, res);
}));
exports.getCurrentUser = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    if (req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return next(new appError_1.default("You are not logged in! Please log in to get access.", 401));
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const userData = yield db_server_1.db.user.findUnique({
            where: {
                id: decoded.id,
            },
        });
        if (!userData) {
            return next(new appError_1.default("The user belonging to this token does no longer exist.", 401));
        }
        const user = {
            id: userData.id,
            name: userData.name,
            email: userData.email,
        };
        res.status(200).json({
            status: "success",
            isLogin: true,
            data: Object.assign({}, user),
        });
    }
    catch (error) {
        return next(new appError_1.default("Invalid Token", 400));
    }
}));
exports.tryMethod = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userFacade = new UserRepository_1.UserFacade();
    const data = yield userFacade.createUser(req.body);
    res.status(200).json({
        data: data,
    });
}));
//# sourceMappingURL=userController.js.map