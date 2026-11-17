import InstagramUrlValidator from './instagram-url-validator.js';

class InstagramPostIdExtractor {
  static extract(url) {
    try {
      if (url === null) {
        throw new Error('A non-empty url expected');
      }

      if (typeof url !== 'string') {
        throw new Error('A string is expected');
      }

      return this.#extractPostId(
        url,
        InstagramUrlValidator.REG_EXP_TO_EXTRACT_POST_ID
      );
    } catch (e) {
      console.log(e);
    }
  }

  static #extractPostId(url, regExp) {
    const matches = url.match(regExp);

    if (!matches) {
      return null;
    }

    return matches.at(-1);
  }
}

export default InstagramPostIdExtractor;
