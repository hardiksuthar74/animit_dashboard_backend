class Validator {
  private data: Record<string, any>;
  private errors: Record<string, string>;

  constructor(data: Record<string, any>) {
    this.data = data;
    this.errors = {};
  }

  isRequired(field: string, message = `${field} is required`): this {
    if (!this.data[field] || this.data[field].trim() === "") {
      this.errors[field] = message;
    }
    return this;
  }

  isEmail(field: string, message = `email format Invalid`): this {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(this.data[field])) {
      this.errors[field] = this.data[field] ? message : `${field} is required`;
    }
    return this;
  }

  getErrors(): Record<string, string> {
    return this.errors;
  }

  isValid(): boolean {
    return Object.keys(this.errors).length === 0;
  }
}

export default Validator;
