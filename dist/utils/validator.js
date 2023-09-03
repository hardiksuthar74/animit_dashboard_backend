"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Validator {
    constructor() {
        this.errors = {};
    }
    setData(data) {
        this.data = data;
    }
    isRequired(field, message = `${field} field is required`) {
        if (!this.data[field] || this.data[field].trim() === "") {
            this.errors[field] = message;
        }
        return this;
    }
    isEmail(field, message = `email format Invalid`) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.data[field])) {
            this.errors[field] = this.data[field]
                ? message
                : `${field} field is required`;
        }
        return this;
    }
    getErrors() {
        return this.errors;
    }
    isValid() {
        return Object.keys(this.errors).length === 0;
    }
    comparePasswordAndCpassowrd(password, confirmPassword, message = `password and confirm password does not match`) {
        if (password !== confirmPassword) {
            this.errors["confirmPassword"] = this.data["confirmPassword"]
                ? message
                : `confirm password field is required`;
            return this;
        }
    }
}
exports.default = Validator;
//# sourceMappingURL=validator.js.map