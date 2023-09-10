export class Anime {
  public id: number;
  public title: string;
  public synopsis: string;
  public season: string;
  public year: number;
  public episodes: number;
  public image: string;
  public status: string;
  public type: string;
  public score: number;
  public popular: number;
  public favorites: number;

  setId(id: string) {
    this.id = parseInt(id);
    return this;
  }

  setTitle(title: string) {
    this.title = title;
    return this;
  }

  setSynopsis(synopsis: string) {
    this.synopsis = synopsis;
    return this;
  }

  setSeason(season: string) {
    this.season = season;
    return this;
  }

  setYear(year: string) {
    this.year = parseInt(year);
    return this;
  }

  setEpisodes(episodes: string) {
    this.episodes = parseInt(episodes);
    return this;
  }

  setImage(image: string) {
    this.image = image;
    return this;
  }

  setStatus(status: string) {
    this.status = status;
    return this;
  }

  setType(type: string) {
    this.type = type;
    return this;
  }

  setScore(score: string) {
    this.score = parseInt(score);
    return this;
  }

  setPopular(popular: string) {
    this.popular = parseInt(popular);
    return this;
  }

  setFavorites(favorites: number) {
    this.favorites = favorites;
    return this;
  }

  build() {
    return this;
  }
}
