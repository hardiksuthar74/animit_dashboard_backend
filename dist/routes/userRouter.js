"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const userRouter = express_1.default.Router();
userRouter.get("/", userController_1.getAllUser);
userRouter.post("/", userController_1.createUser);
userRouter.post("/login", userController_1.loginUser);
userRouter.get("/getMe", userController_1.getCurrentUser);
userRouter.get("/try", userController_1.tryMethod);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map