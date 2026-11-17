class PostIdExtractor {
  static extract(url, regExp) {
    if (url === null) {
      throw new Error('A non-null url expected');
    }

    if (typeof url !== 'string') {
      throw new Error(`A string is expected, but ${url?.constructor.name ?? typeof url} is provided`);
    }

    if (!(regExp instanceof RegExp)) {
      throw new Error(`A RegExp instance is expected, but ${regExp?.constructor.name ?? typeof regExp} is provided`);
    }

    return this.#extractPostId(url, regExp);
  }

  static #extractPostId(url, regExp) {
    const matches = url.match(regExp);

    if (!matches) {
      return null;
    }

    return matches.at(-1);
  }
}

export default PostIdExtractor;
