import { db } from "../database/db.server";

class UserStore {
  async getAllUser() {
    const allUser = await db.user.findMany();
    return allUser;
  }

  async createUser(name: string, email: string, password: string) {
    const user = await db.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });
  }
}

class User {
  private name: string;
  private email: string;
  private password: string;

  setName(name: string) {
    this.name = name;
  }

  setPassword(password: string) {
    this.password = password;
  }

  setEmail(email: string) {
    this.email = email;
  }
}

class UserFactory {
  newUser = new User();

  readyUser(name: string, password: string, email: string) {
    this.newUser.setName(name);
    this.newUser.setEmail(email);
    this.newUser.setPassword(password);

    return this.newUser;
  }
}
