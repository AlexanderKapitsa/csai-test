class InstagramInitializerSingleton {
  static #instance = null;
  #interval = null;

  static getInstance() {
    if (InstagramInitializerSingleton.#instance === null) {
      InstagramInitializerSingleton.#instance =
        new InstagramInitializerSingleton();
    }

    return InstagramInitializerSingleton.#instance;
  }

  initialize() {
    const isInitializedBefore = this.#interval !== null;

    if (isInitializedBefore) {
      return;
    }

    this.#interval = setInterval(this.#embedPrettifier.bind(this), 3);
    this.#watchResize();
  }

  #embedPrettifier() {
    const isDocumentReady = document.readyState === 'complete';

    this.#removeBorderFromAllElementsBySelector('iframe');

    if (isDocumentReady) {
      this.#processLoadedEmbeds();
      clearInterval(this.#interval);
      return;
    }

    this.#processFallbackElements();
  }

  #watchResize() {
    const handleSizeChange = () => this.#processLoadedEmbeds();
    const resizeObserver = new ResizeObserver(handleSizeChange);

    const embeds = document.querySelectorAll('[data-instagram-embed]');
    embeds.forEach((m) => resizeObserver.observe(m));
  }

  #processLoadedEmbeds() {
    this.#processEmbedsBySelector('.instagram-media');
  }

  #processFallbackElements() {
    this.#processEmbedsBySelector('.instagram-media-registered');
  }

  #processEmbedsBySelector(selector) {
    const embeds = document.querySelectorAll(selector);

    embeds.forEach((embed) => {
      this.#disableMarginsForEl(embed);
      this.#reduceMarginBottomForGrandParentContainerOf(embed);
    });
  }

  #disableMarginsForEl(el) {
    el.style.margin = 0;
  }

  #reduceMarginBottomForGrandParentContainerOf(el) {
    const marginBottomToSet = this.#getMarginToSetToFixWhitespaceOfScaling(el);

    const grandParentContainer = el.parentElement.parentElement;
    grandParentContainer.style.marginBottom = `-${marginBottomToSet}px`;
  }

  #getMarginToSetToFixWhitespaceOfScaling(el) {
    const containerDimensions = el.parentElement.getBoundingClientRect();

    const containerRealHeight = containerDimensions.height;
    const embedOriginalHeight = el.height ?? el.offsetHeight;

    const neededMargin = Math.abs(embedOriginalHeight - containerRealHeight);
    return neededMargin;
  }

  #removeBorderFromAllElementsBySelector(selector) {
    document.querySelectorAll(selector).forEach((iframe) => {
      iframe.style.border = 'none';
    });
  }
}
