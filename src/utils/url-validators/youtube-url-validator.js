import { YoutubeVideoRegExp } from '../regular-expressions/index.js';
import BaseUrlValidator from './base-url-validator.js';

class YouTubeUrlValidator extends BaseUrlValidator {
  static validate(url) {
    return BaseUrlValidator.validate(url, YoutubeVideoRegExp.REG_EXP);
  }
}

export default YouTubeUrlValidator;
