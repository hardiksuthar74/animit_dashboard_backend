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
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertSingleAnime = exports.getSingleAnime = exports.getSearchedAnime = void 0;
const AnimeService_1 = require("../services/AnimeService");
const getSearchedAnime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const animeData = new AnimeService_1.AnimeData();
    const { anime } = req.body;
    //   console.log(req.body);
    const searchedData = yield animeData.fetchJikanData(anime);
    res.status(200).json({
        status: "success",
        data: searchedData,
    });
});
exports.getSearchedAnime = getSearchedAnime;
const getSingleAnime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const animeData = new AnimeService_1.AnimeData();
    const { animeid } = req.body;
    const searchedData = yield animeData.fetchSingleAnime(animeid);
    res.status(200).json({
        status: "success",
        data: searchedData,
    });
});
exports.getSingleAnime = getSingleAnime;
const insertSingleAnime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const animeData = new AnimeService_1.AnimeData();
    // console.log(req.body);
    // return;
    const insertAnime = yield animeData.insertAnimeData(req.body);
    res.status(200).json({
        status: "success",
        data: insertAnime,
    });
});
exports.insertSingleAnime = insertSingleAnime;
//# sourceMappingURL=animeController.js.map