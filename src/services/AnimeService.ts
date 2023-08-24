import { db } from "../database/db.server";

class AnimeData {
  async fetchJikanData(query: string) {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${query}`);

    const data = await response.json();

    const dataToSend = data?.data.map((anime: any) => {
      return {
        mal_id: anime.mal_id,
        title: anime.title,
        images: anime.images.webp.large_image_url,
        type: anime.type,
        episodes: anime.episodes,
        status: anime.status,
        score: anime.score,
        popularity: anime.popularity,
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
      images: anime.images.webp.large_image_url,
      type: anime.type,
      episodes: anime.episodes,
      status: anime.status,
      score: anime.score,
      popularity: anime.popularity,
      season: anime.season,
      year: anime.year,
      synopsis: anime.synopsis,
    };
  }
}

export { AnimeData };
