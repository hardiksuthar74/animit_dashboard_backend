import { PrismaClient } from "@prisma/client";

let db: PrismaClient;
declare global {
  var __db: PrismaClient | undefined;
}

if (!global.__db) {
  global.__db = new PrismaClient();
}

db = global.__db;

export { db };

// class Database {
//   private prisma: PrismaClient;
//   private static instance: Database;

//   private constructor() {
//     this.prisma = new PrismaClient();
//   }

//   static getInstance() {
//     if (!Database.instance) {
//       Database.instance = new Database();
//     }
//     return Database.instance;
//   }
// }

// export { Database };
