import { TwitterUrlWithPostIdRegExp } from '../regular-expressions/index.js';
import BaseUrlValidator from './base-url-validator.js';

class TwitterUrlValidator extends BaseUrlValidator {
  static validate(url) {
    return BaseUrlValidator.validate(url, TwitterUrlWithPostIdRegExp.REG_EXP);
  }
}

export default TwitterUrlValidator;
