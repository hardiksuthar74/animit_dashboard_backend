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
}

export { AnimeData };
