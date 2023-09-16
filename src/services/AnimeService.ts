import { db } from "../database/db.server";
import AppError from "../utils/appError";
import Validator from "../utils/validator";

class AnimeService {
  async getAllAnimeDataMethod(query: any) {
    const apiFeatures = new ApiFeatures();
    apiFeatures.buildQuery(query).type().page().limit().status().search();
    const jikanUrl = apiFeatures.url;
    const response = await fetch(jikanUrl);
    const data = await response.json();
    if (data.status) {
      if (data.status === 404)
        throw new AppError("Resource does not exist", 404);
    }
    const dataToSend = await this.serializeData(data);
    return dataToSend;
  }

  async getAnimeDataByIdMethod(animeId: any) {
    const apiFeatures = new ApiFeatures();
    apiFeatures.forId(animeId);
    const jikanUrl = apiFeatures.url;

    const response = await fetch(jikanUrl);
    const data = await response.json();

    if (data.status) {
      if (data.status === 404)
        throw new AppError("Resource does not exist", 404);
    }

    const dataToSend = await this.serializeSingleData(data);
    return dataToSend;
  }

  async getAnimeRecommendationsMethod(animeId: any) {
    const apiFeatures = new ApiFeatures();
    apiFeatures.recommend(animeId);
    const jikanUrl = apiFeatures.url;
    const response = await fetch(jikanUrl);
    const data = await response.json();
    if (data.status) {
      if (data.status === 404)
        throw new AppError("Resource does not exist", 404);
    }
    const dataToSend = await this.serializeRecommendData(data);

    return dataToSend;
  }

  async addSpotlightAnimeMethod(body: any) {
    const spotlightAnime = await db.spotlight.create({
      data: {
        coverImage: body.coverImage,
        rank: parseInt(body.rank),
        jikanAnimeId: parseInt(body.jikanAnimeId),
      },
    });

    const dataToAdd = await this.getAnimeDataByIdMethod(body.jikanAnimeId);

    const animeAddSpotlight = await db.anime.create({
      data: {
        jikanAnimeId: parseInt(dataToAdd.mal_id),
        title: dataToAdd.title,
        image: dataToAdd.image,
        type: dataToAdd.type,
        episodes: dataToAdd.episodes,
        status: dataToAdd.status,
        score: dataToAdd.score,
        popular: dataToAdd.popular,
        season: dataToAdd.season,
        synopsis: dataToAdd.synopsis,
        year: dataToAdd.year,
      },
    });

    return animeAddSpotlight;
  }

  async getAllSpotLightAnimeMethod() {
    const animeFromDb = await db.spotlight.findMany();

    const animeData = [];
    for (const anime of animeFromDb) {
      const animeSpotData = await db.anime.findFirst({
        where: { jikanAnimeId: anime.jikanAnimeId },
      });

      const dataToPush = {
        ...anime,
        ...animeSpotData,
      };

      animeData.push(dataToPush);
    }

    return animeData;
  }

  private async serializeData(data: any) {
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

  private async serializeSingleData(data: any) {
    return {
      mal_id: data?.data.mal_id,
      title: data?.data.title,
      image: data?.data.images.webp.large_image_url,
      type: data?.data.type,
      episodes: data?.data.episodes,
      status: data?.data.status,
      score: data?.data.score,
      popular: data?.data.popularity,
      season: data?.data.season,
      year: data?.data.year,
      synopsis: data?.data.synopsis,
    };
  }

  private async serializeRecommendData(data: any) {
    const dataToSend = data?.data.map((anime: any) => {
      return {
        mal_id: anime.entry.mal_id,
        title: anime.entry.title,
        image: anime.entry.images.webp.large_image_url,
      };
    });

    return dataToSend;
  }
}

class ApiFeatures {
  public url = "https://api.jikan.moe/v4/anime?";
  public query: any;

  buildQuery(query: any) {
    this.query = query;
    return this;
  }
  page() {
    if (this.query["page"]) {
      this.url = `${this.url}&page=${this.query.page}`;
    }

    return this;
  }
  limit() {
    if (this.query["limit"]) {
      this.url = `${this.url}&limit=${this.query.limit}`;
    }

    return this;
  }

  type() {
    if (this.query["type"]) {
      this.url = `${this.url}&type=${this.query.type}`;
    }

    return this;
  }

  status() {
    if (this.query["status"]) {
      this.url = `${this.url}&status=${this.query.status}`;
    }

    return this;
  }

  search() {
    if (this.query["q"]) {
      this.url = `${this.url}&q=${this.query.q}`;
    }

    return this;
  }

  forId(id: any) {
    this.url = `https://api.jikan.moe/v4/anime/${id}`;

    return this;
  }

  recommend(id: any) {
    this.url = `https://api.jikan.moe/v4/anime/${id}/recommendations`;

    return this;
  }
}

export { AnimeService };
