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
exports.AnimeData = void 0;
const db_server_1 = require("../database/db.server");
const Anime_1 = require("../models/Anime");
class AnimeData {
    fetchJikanData(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://api.jikan.moe/v4/anime?q=${query}`);
            const data = yield response.json();
            const dataToSend = data === null || data === void 0 ? void 0 : data.data.map((anime) => {
                return {
                    mal_id: anime.mal_id,
                    title: anime.title,
                    image: anime.images.webp.large_image_url,
                    type: anime.type,
                    episodes: anime.episodes,
                    status: anime.status,
                    score: anime.score,
                    popular: anime.popularity,
                    season: anime.season,
                    year: anime.year,
                    synopsis: anime.synopsis,
                };
            });
            return dataToSend;
        });
    }
    fetchSingleAnime(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`https://api.jikan.moe/v4/anime/${query}`);
            const data = yield response.json();
            const anime = data === null || data === void 0 ? void 0 : data.data;
            return {
                mal_id: anime.mal_id,
                title: anime.title,
                image: anime.images.webp.large_image_url,
                type: anime.type,
                episodes: anime.episodes,
                status: anime.status,
                score: anime.score,
                popular: anime.popularity,
                season: anime.season,
                year: anime.year,
                synopsis: anime.synopsis,
            };
        });
    }
    insertAnimeData(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const animeBuilder = new Anime_1.Anime();
            const { title, year, episodes, image, type, popular, score, season, status, synopsis, } = body;
            animeBuilder
                .setTitle(title)
                .setYear(year)
                .setEpisodes(episodes)
                .setImage(image)
                .setType(type)
                .setPopular(popular)
                .setScore(score)
                .setSeason(season)
                .setStatus(status)
                .setSynopsis(synopsis)
                .build();
            this.insertData(animeBuilder);
        });
    }
    insertData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const anime = yield db_server_1.db.anime.create({
                data,
            });
        });
    }
}
exports.AnimeData = AnimeData;
//# sourceMappingURL=AnimeService.js.map