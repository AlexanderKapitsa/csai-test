import path from 'path';
import supportedMediaExtensions from '../data/supported-media-extensions.json';

async function dynamicViteAssetImport(imageFileName) {
  const { name, ext } = path.parse(imageFileName);

  const actualExtWithoutLeadingDot = ext.slice(1);
  const lowerExt = actualExtWithoutLeadingDot.toLowerCase();

  if (supportedMediaExtensions.includes(lowerExt)) {
    return import(`../assets/${name}.${actualExtWithoutLeadingDot}`);
  }
}

export default dynamicViteAssetImport;
