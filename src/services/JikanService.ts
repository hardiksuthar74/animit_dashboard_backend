import { db } from "../database/db.server";
import { Anime } from "../models/Anime";

interface animeType {
  title: string;
  synopsis: string;
  season: string;
  year: number;
  episodes: number;
  image: string;
  status: string;
  type: string;
  score: number;
  popular: number;
  favorites: number;
}

class AnimeData {
  async fetchJikanData(query: string) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

    const data = await response.json();

    const dataToSend = data?.data.map((anime: any) => {
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
  }

  async fetchSingleAnime(query: string) {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${query}`);

    const data = await response.json();

    const anime = data?.data;

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
  }

  async insertAnimeData(body: Record<string, any>) {
    const animeBuilder = new Anime();

    const {
      title,
      year,
      episodes,
      image,
      type,
      popular,
      score,
      season,
      status,
      synopsis,
    } = body;

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
  }

  async insertData(data: animeType) {
    const anime = await db.anime.create({
      data,
    });
  }

  async setDataInOrder(data: any) {
    const dataToSend = data.map((anime: any) => {
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
  }

  async getAllAnime(query: any) {
    let url = "https://api.jikan.moe/v4/anime?";

    if (query["page"]) {
      url = `${url}&page=${query["page"]}`;
    }

    if (query["limit"]) {
      url = `${url}&limit=${query["limit"]}`;
    }

    if (query["genres"]) {
      url = `${url}&genres=${query["genres"]}`;
    }

    if (query["q"]) {
      url = `${url}&q=${query["q"]}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    const anime = await this.setDataInOrder(data?.data);

    return anime;
  }

  async getTrendingAnime() {
    let url =
      "https://api.jikan.moe/v4/top/anime?limit=10&type=tv&filter=airing";

    const response = await fetch(url);
    const data = await response.json();

    const anime = await this.setDataInOrder(data?.data);

    return anime;
  }

  async getFavouritestAnime() {
    const data = await db.anime.findMany();

    // const anime = await this.setDataInOrder(data);

    return data;
  }

  async getAnimeByGenre(query) {
    let url = `https://api.jikan.moe/v4/anime?genres=${query["genre"]}`;

    const response = await fetch(url);
    const data = await response.json();

    const anime = await this.setDataInOrder(data?.data);

    return anime;
  }
}
export { AnimeData };
