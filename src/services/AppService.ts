import { db } from "../database/db.server";
import AppError from "../utils/appError";

class AppService {
  // public userId: number;
  // constructor(userId: string) {
  //   this.userId = parseInt(userId);
  // }
  // async addAnimeMethod(body: Record<string, any>) {
  //   const { animeId, process, episodes } = body;
  //   const checkIfAdded = await db.process.findFirst({
  //     where: {
  //       userId: this.userId,
  //       animeId: animeId,
  //       process: process,
  //     },
  //   });
  //   if (checkIfAdded) {
  //     throw new AppError("Already added", 200);
  //   }
  //   const data = await db.process.create({
  //     data: {
  //       userId: this.userId,
  //       animeId: animeId,
  //       process: process,
  //       episodes: episodes,
  //     },
  //   });
  //   return data;
  // }
  // async updateProcessStatus(body: Record<string, any>) {
  //   const { id, process, episodes } = body;
  //   if (parseInt(process) > 4) {
  //     throw new AppError("Please select a valid option", 200);
  //   }
  //   if (parseInt(process) < 0) {
  //     throw new AppError("Please select a valid option", 200);
  //   }
  //   const data = await db.process.update({
  //     where: {
  //       id: parseInt(id),
  //     },
  //     data: {
  //       process: parseInt(process),
  //       episodes: parseInt(episodes),
  //     },
  //   });
  //   return data;
  // }
  // async addEpisodes(body: Record<string, any>) {
  //   const { id, episodes } = body;
  //   const data = await db.process.update({
  //     where: {
  //       id: parseInt(id),
  //     },
  //     data: {
  //       episodes: parseInt(episodes),
  //     },
  //   });
  //   return data;
  // }
}

export { AppService };
