"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anime = void 0;
class Anime {
    setTitle(title) {
        this.title = title;
        return this;
    }
    setSynopsis(synopsis) {
        this.synopsis = synopsis;
        return this;
    }
    setSeason(season) {
        this.season = season;
        return this;
    }
    setYear(year) {
        this.year = parseInt(year);
        return this;
    }
    setEpisodes(episodes) {
        this.episodes = parseInt(episodes);
        return this;
    }
    setImage(image) {
        this.image = image;
        return this;
    }
    setStatus(status) {
        this.status = status;
        return this;
    }
    setType(type) {
        this.type = type;
        return this;
    }
    setScore(score) {
        this.score = parseInt(score);
        return this;
    }
    setPopular(popular) {
        this.popular = parseInt(popular);
        return this;
    }
    setFavorites(favorites) {
        this.favorites = favorites;
        return this;
    }
    build() {
        return this;
    }
}
exports.Anime = Anime;
//# sourceMappingURL=Anime.js.map