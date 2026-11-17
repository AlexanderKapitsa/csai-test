import ImageDimensionsGetter from '../image-dimensions-getter.js';
import { DimensionConstrainer } from './index.js';

class ConstrainedWidthResolver {
  #maxMobileWidth;
  #maxMobileHeight;
  #maxDesktopWidth;
  #maxDesktopHeight;

  constructor({ maxDimensions }) {
    this.#maxMobileWidth = maxDimensions.mobile.width;
    this.#maxMobileHeight = maxDimensions.mobile.height;
    this.#maxDesktopWidth = maxDimensions.desktop.width;
    this.#maxDesktopHeight = maxDimensions.desktop.height;
  }

  async resolveFor(src) {
    const [originalWidth, originalHeight] = await ImageDimensionsGetter.from(src);

    const constrainerMobile = DimensionConstrainer.fromMaxDimensions({
      width: this.#maxMobileWidth,
      height: this.#maxMobileHeight,
    });
    let mobileWidth = constrainerMobile.getConstrainedWidth(originalWidth, originalHeight);

    const constrainerDesktop = DimensionConstrainer.fromMaxDimensions({
      width: this.#maxDesktopWidth,
      height: this.#maxDesktopHeight,
    });
    let desktopWidth = constrainerDesktop.getConstrainedWidth(originalWidth, originalHeight);

    return {
      mobileWidth,
      desktopWidth,
    };
  }
}

export default ConstrainedWidthResolver;
