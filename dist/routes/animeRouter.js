"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animeController_1 = require("../controllers/animeController");
const animeRouter = express_1.default.Router();
animeRouter.post("/search", animeController_1.getSearchedAnime);
animeRouter.post("/singleanime", animeController_1.getSingleAnime);
animeRouter.post("/insertAnime", animeController_1.insertSingleAnime);
exports.default = animeRouter;
//# sourceMappingURL=animeRouter.js.map