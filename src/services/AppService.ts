import { db } from "../database/db.server";

class AppService {
  public userId: number;

  constructor(userId: string) {
    this.userId = parseInt(userId);
  }

  async addAnimeMethod(body: Record<string, any>) {
    // const data = {};
    // const data = await db.;
  }
}

export { AppService };
