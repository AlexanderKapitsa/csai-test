class RedirectConfigurator {
  #pathToAppend;

  static withPathToAppend(pathToAppend) {
    return new RedirectConfigurator(pathToAppend);
  }

  constructor(pathToAppend) {
    this.#pathToAppend = pathToAppend;
  }

  getConfiguredMapFrom(items, fieldAccessFn) {
    const redirects = {};

    items.forEach((c) => {
      const property = fieldAccessFn(c);
      const configuredProperty = this.#appendToPath(
        property,
        this.#pathToAppend
      );
      redirects[property] = configuredProperty;
    });

    return redirects;
  }

  #appendToPath(originalPath, addition) {
    return `${originalPath}${addition}`;
  }
}

export default RedirectConfigurator;
