import en from '../../i18n/en.json';
import uk from '../../i18n/uk.json';

const supportedLocales = ['uk', 'en'];

export function getLocale(url) {
  const segments = url.pathname.split('/');
  const found = segments.find((s) => supportedLocales.includes(s));
  return found ?? supportedLocales[0]; // default locale
}

export function getLocaleUrl(pathname, targetLocale) {
  const segments = pathname.split('/');

  const localeIndex = segments.findIndex((s) => supportedLocales.includes(s));
  if (localeIndex !== -1) {
    segments[localeIndex] = targetLocale;
  } else {
    segments.splice(0, 1, targetLocale);
  }

  return segments.filter(Boolean).join('/');
}

const getLocaleObject = (locale) => {
  let localeObject;

  switch (locale) {
    case 'en':
      localeObject = en;
      break;
    default:
      localeObject = uk;
  }

  return localeObject;
};

function getDescendantProp(obj, desc) {
  const arr = desc.split('.');
  while (arr.length && (obj = obj[arr.shift()])) {}
  return obj;
}

export const init = (url) => {
  const locale = getLocale(url);
  const localeObject = getLocaleObject(locale);

  const t = (description) => {
    const property = getDescendantProp(localeObject, description);

    if (typeof property === 'undefined') {
      return getDescendantProp(en, description);
    }

    return property;
  };

  const l = (targetLink) => {
    if (targetLink === '#' || !targetLink.includes('/')) {
      return targetLink;
    }

    return `/${locale}${targetLink}`;
  };

  return {
    t,
    l,
  };
};
