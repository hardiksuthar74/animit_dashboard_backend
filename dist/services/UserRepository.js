"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFacade = void 0;
const db_server_1 = require("../database/db.server");
const bcrypt_1 = require("bcrypt");
const validator_1 = __importDefault(require("../utils/validator"));
const appError_1 = __importDefault(require("../utils/appError"));
const saltRounds = 10;
class UserFacade {
    constructor() {
        this.userDb = new UserDb();
    }
    createUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new validator_1.default();
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
                throw new appError_1.default("form error", 404, errors);
            }
            const hasEmail = yield this.userDb.checkEmail(body.email);
            if (hasEmail) {
                throw new appError_1.default("form error", 404, { email: "email already taken" });
            }
            const authHelper = new AuthHelper();
            const password = yield authHelper.hashPassword(body.password);
            const user = new User();
            user.addName(body.name).addEmail(body.email).addPassword(password);
            const createdUser = yield this.userDb.insertUser(user);
            return createdUser;
        });
    }
    loginUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const validator = new validator_1.default();
            validator.setData(body);
            validator.isRequired("email").isRequired("password").isEmail("email");
            if (!validator.isValid()) {
                const errors = validator.getErrors();
                throw new appError_1.default("form error", 404, errors);
            }
            const userCreditionals = yield this.userDb.getUserByEmail(body.email);
            const authHelper = new AuthHelper();
            const checkPassword = yield authHelper.comparePassword(body.password, userCreditionals.password);
            if (!checkPassword) {
                throw new appError_1.default("Email or Password Incorrect", 401);
            }
            return userCreditionals;
        });
    }
}
exports.UserFacade = UserFacade;
class UserDb {
    checkEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_server_1.db.user.findUnique({
                where: {
                    email: email,
                },
            });
            if (user) {
                return true;
            }
            return false;
        });
    }
    insertUser(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_server_1.db.user.create({
                data: body,
            });
            return user;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield db_server_1.db.user.findUnique({
                where: {
                    email: email,
                },
            });
            return user;
        });
    }
}
class AuthHelper {
    hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            const pass = yield (0, bcrypt_1.hash)(password, saltRounds);
            return pass;
        });
    }
    comparePassword(password, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, bcrypt_1.compare)(password, hashedPassword);
        });
    }
}
class User {
    constructor() { }
    addName(name) {
        this.name = name;
        return this;
    }
    addEmail(email) {
        this.email = email;
        return this;
    }
    addPassword(password) {
        this.password = password;
        return this;
    }
}
//# sourceMappingURL=UserRepository.js.map