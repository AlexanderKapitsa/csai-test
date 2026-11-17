class IframeInitializerPool {
  static #instances = [];

  static getInitializer(mainSelector, fallbackSelector, wrapperSelector) {
    const existingInstance =
      IframeInitializerPool.#getExistingInstanceBySelector(mainSelector);

    if (existingInstance) {
      return existingInstance;
    }

    const newInstance = IframeInitializerPool.#createInstance(
      mainSelector,
      fallbackSelector,
      wrapperSelector
    );

    IframeInitializerPool.#addInstanceToPool(mainSelector, newInstance);

    return newInstance;
  }

  static #getExistingInstanceBySelector(mainSelector) {
    return IframeInitializerPool.#instances[mainSelector];
  }

  static #createInstance(mainSelector, fallbackSelector, wrapperSelector) {
    return new IframeInitializer(
      mainSelector,
      fallbackSelector,
      wrapperSelector
    );
  }

  static #addInstanceToPool(mainSelector, instance) {
    IframeInitializerPool.#instances[mainSelector] = instance;
  }
}

class IframeInitializer {
  #interval = null;
  #mainSelector;
  #fallbackSelector;
  #wrapperSelector;
  #containerSelectorFn = (el) => el.parentElement;

  constructor(mainSelector, fallbackSelector, wrapperSelector) {
    this.#mainSelector = mainSelector;
    this.#fallbackSelector = fallbackSelector;
    this.#wrapperSelector = wrapperSelector;
  }

  initialize(adjusters) {
    if (adjusters && adjusters.containerSelectorFn) {
      this.#containerSelectorFn = adjusters.containerSelectorFn;
    }

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

    const embeds = document.querySelectorAll(this.#wrapperSelector);

    if (embeds.length === 0) {
      return;
    }

    embeds.forEach((m) => resizeObserver.observe(m));
  }

  #processLoadedEmbeds() {
    this.#mainSelector && this.#processEmbedsBySelector(this.#mainSelector);
  }

  #processFallbackElements() {
    this.#fallbackSelector &&
      this.#processEmbedsBySelector(this.#fallbackSelector);
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
    let marginBottomToSet = this.#getMarginToSetToFixWhitespaceOfScaling(el);

    const container = this.#containerSelectorFn(el);
    container.style.marginBottom = `-${marginBottomToSet}px`;
  }

  #getMarginToSetToFixWhitespaceOfScaling(el) {
    const containerDimensions = el.parentElement.getBoundingClientRect();

    const containerRealHeight = containerDimensions.height;
    const embedOriginalHeight = el.offsetHeight ?? el.height;

    const neededMargin = Math.abs(embedOriginalHeight - containerRealHeight);
    return neededMargin;
  }

  #removeBorderFromAllElementsBySelector(selector) {
    document.querySelectorAll(selector).forEach((iframe) => {
      iframe.style.border = 'none';
    });
  }
}
