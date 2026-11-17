import dynamicViteAssetImport from './dynamic-vite-asset-import.js';

class ImageDimensionsGetter {
  static async from(src) {
    const name = getFileNameFrom(src);
    const image = await dynamicViteAssetImport(name);

    const width = image.default.width;
    const height = image.default.height;

    return [width, height];

    function getFileNameFrom(src) {
      return src.split('/').at(-1);
    }
  }
}

export default ImageDimensionsGetter;
