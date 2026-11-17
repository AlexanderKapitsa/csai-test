import { InstagramUrlWithPostIdRegExp } from '../regular-expressions/index.js';
import BaseUrlValidator from './base-url-validator.js';

class InstagramUrlValidator extends BaseUrlValidator {
  static validate(url) {
    return BaseUrlValidator.validate(url, InstagramUrlWithPostIdRegExp.REG_EXP);
  }
}

export default InstagramUrlValidator;
