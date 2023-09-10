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

class AnimeService {
  async getAllAnimeData() {
    const data = await db.anime.findMany();

    return data;
  }

  async deleteAnimeData(id) {
    const data = await db.anime.delete({
      where: {
        id: id,
      },
    });

    return data;
  }

  async addAnimeMethod(body) {
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

    const data = await db.anime.create({
      data: animeBuilder,
    });

    return data;
  }

  async updateAnimeMethod(body) {
    // console.log(body);

    const animeBuilder = new Anime();

    const {
      id,
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
      .setId(id)
      .setTitle(title)
      .setYear(year)
      .setEpisodes(episodes)
      .setType(type)
      .setImage(image)
      .setScore(score)
      .setSeason(season)
      .setStatus(status)
      .setSynopsis(synopsis)
      .build();

    // console.log(id);

    const animeData = await db.anime.update({
      where: {
        id: parseInt(id),
      },
      data: animeBuilder,
    });

    return animeData;
  }
}

export { AnimeService };
