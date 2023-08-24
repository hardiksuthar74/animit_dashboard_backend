import { db } from "../database/db.server";
import { hash, compare } from "bcrypt";
import Validator from "../utils/validator";
import AppError from "../utils/appError";

const saltRounds: number = 10;

interface userType {
  name: string;
  password: string;
  email: string;
}

class UserFacade {
  private userDb = new UserDb();

  constructor() {}

  async createUser(body: Record<string, any>) {
    const validator = new Validator();

    validator.setData(body);
    validator
      .isRequired("name")
      .isRequired("email")
      .isRequired("password")
      .isRequired("confirmPassword")
      .isEmail("email")
      .comparePasswordAndCpassowrd(body.password, body.confirmPassword);

    if (!validator.isValid()) {
      const errors = validator.getErrors();
      throw new AppError("form error", 404, errors);
    }

    const hasEmail: boolean = await this.userDb.checkEmail(body.email);

    if (hasEmail) {
      throw new AppError("form error", 404, { email: "email already taken" });
    }

    const authHelper = new AuthHelper();

    const password = await authHelper.hashPassword(body.password);

    const user = new User();

    user.addName(body.name).addEmail(body.email).addPassword(password);

    const createdUser = await this.userDb.insertUser(user);

    return createdUser;
  }

  async loginUser(body: Record<string, any>) {
    const validator = new Validator();

    validator.setData(body);

    validator.isRequired("email").isRequired("password").isEmail("email");

    if (!validator.isValid()) {
      const errors: Record<string, string> = validator.getErrors();

      throw new AppError("form error", 404, errors);
    }

    const userCreditionals = await this.userDb.getUserByEmail(body.email);
    const authHelper = new AuthHelper();
    const checkPassword = await authHelper.comparePassword(
      body.password,
      userCreditionals.password
    );

    if (!checkPassword) {
      throw new AppError("Email or Password Incorrect", 401);
    }

    return userCreditionals;
  }
}

class UserDb {
  async checkEmail(email: string): Promise<boolean> {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return true;
    }
    return false;
  }

  async insertUser(body: userType) {
    const user = await db.user.create({
      data: body,
    });

    return user;
  }

  async getUserByEmail(email: string) {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    return user;
  }
}

class AuthHelper {
  private password: string;
  private hashPasowrd: string;
  private saltRounds: number;

  async hashPassword(password: string) {
    const pass = await hash(password, saltRounds);

    return pass;
  }

  async comparePassword(password: string, hashedPassword: string) {
    return await compare(password, hashedPassword);
  }
}

class User {
  public name: string;
  public email: string;
  public password: string;
  constructor() {}

  addName(name: string) {
    this.name = name;
    return this;
  }
  addEmail(email: string) {
    this.email = email;
    return this;
  }
  addPassword(password: string) {
    this.password = password;
    return this;
  }
}

export { UserFacade };
