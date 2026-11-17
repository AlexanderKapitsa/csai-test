import { TelegramUrlWithPostIdRegExp } from '../regular-expressions';
import BaseUrlValidator from './base-url-validator.js';

class TelegramUrlValidator extends BaseUrlValidator {
  static validate(url) {
    return BaseUrlValidator.validate(url, TelegramUrlWithPostIdRegExp.REG_EXP);
  }
}

export default TelegramUrlValidator;
