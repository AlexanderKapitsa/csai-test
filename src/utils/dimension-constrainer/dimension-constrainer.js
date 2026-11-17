import UnexpectedErrorTypeCreator from '../unexpected-error-type-creator.js';

class DimensionConstrainer {
  #maxWidth;
  #maxHeight;

  static fromMaxDimensions({ width, height }) {
    return new DimensionConstrainer(width, height);
  }

  constructor(maxWidth, maxHeight) {
    if (typeof maxWidth !== 'number') {
      throw UnexpectedErrorTypeCreator.create(maxWidth, 'number');
    }

    if (typeof maxHeight !== 'number') {
      throw UnexpectedErrorTypeCreator.create(maxHeight, 'number');
    }

    if (!Number.isSafeInteger(maxWidth) || !Number.isSafeInteger(maxHeight)) {
      throw new Error(`Integers are expected, but [${maxWidth};${maxHeight}] are provided`);
    }

    if (maxWidth <= 0 || maxHeight <= 0) {
      throw new Error(`Both [maxWidth;maxHeight] must be positives, but [${maxWidth};${maxHeight}] given instead`);
    }

    this.#maxWidth = maxWidth;
    this.#maxHeight = maxHeight;
  }

  getConstrainedWidth(width, height) {
    if (typeof width !== 'number') {
      throw UnexpectedErrorTypeCreator.create(width, 'number');
    }

    if (typeof height !== 'number') {
      throw UnexpectedErrorTypeCreator.create(height, 'number');
    }

    if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height)) {
      throw new Error(`Integers are expected, but [${width};${height}] are provided`);
    }

    if (width <= 0 || height <= 0) {
      throw new Error(`Both [width;height] must be positives, but [${width};${height}] given instead`);
    }

    const heightScaleDownMultiplier = height / this.#maxHeight;
    const isHeightScaledDown = heightScaleDownMultiplier > 1;

    if (isHeightScaledDown) {
      width = width / heightScaleDownMultiplier;
    }

    width = width > this.#maxWidth ? this.#maxWidth : width;

    return width;
  }
}

export default DimensionConstrainer;
