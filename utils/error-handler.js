const TYPE_GENERAL = 'general';
const TYPE_VALIDATION = 'validation';

class ErrorHandler {
  static get TYPE_GENERAL() {
    return TYPE_GENERAL;
  }

  static get TYPE_VALIDATION() {
    return TYPE_VALIDATION;
  }

  constructor(type = ErrorHandler.TYPE_GENERAL, message = '', errors = {}) {
    this.type = type;
    this.message = message;
    this.errors = errors;
  }
}

module.exports = ErrorHandler;
