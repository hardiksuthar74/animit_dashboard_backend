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
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.verifyPassword = exports.isValidEmail = void 0;
const crypto_1 = require("crypto");
const hashPassword = (input) => {
    let password = (0, crypto_1.createHash)("sha256").update(input).digest("hex");
    return password;
};
exports.hashPassword = hashPassword;
const verifyPassword = (inputPassword, storedHashedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const HashedPassword = hashPassword(inputPassword);
    return HashedPassword === storedHashedPassword;
});
exports.verifyPassword = verifyPassword;
const isValidEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
};
exports.isValidEmail = isValidEmail;
//# sourceMappingURL=authHelper.js.map