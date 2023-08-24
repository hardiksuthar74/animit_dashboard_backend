class Validator {
  private data: Record<string, any>;
  private errors: Record<string, string>;

  constructor() {
    this.errors = {};
  }

  setData(data: Record<string, any>) {
    this.data = data;
  }

  isRequired(field: string, message = `${field} field is required`): this {
    if (!this.data[field] || this.data[field].trim() === "") {
      this.errors[field] = message;
    }
    return this;
  }

  isEmail(field: string, message = `email format Invalid`): this {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.data[field])) {
      this.errors[field] = this.data[field]
        ? message
        : `${field} field is required`;
    }
    return this;
  }

  getErrors(): Record<string, string> {
    return this.errors;
  }

  isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }

  comparePasswordAndCpassowrd(
    password: string,
    confirmPassword: string,
    message = `password and confirm password does not match`
  ) {
    if (password !== confirmPassword) {
      this.errors["confirmPassword"] = this.data["confirmPassword"]
        ? message
        : `confirm password field is required`;

      return this;
    }
  }
}

export default Validator;
