import { test, expect } from 'vitest';
import PostIdExtractor from '../../src/utils/post-id-extractor.js';
import { InstagramUrlWithPostIdRegExp, TelegramUrlWithPostIdRegExp } from '../../src/utils/regular-expressions/index.js';

const extractionOf = (url, regExp) => PostIdExtractor.extract(url, regExp);

const extractionOfInstagramPostIdFrom = (url) => extractionOf(url, InstagramUrlWithPostIdRegExp.REG_EXP);
const extractionOfTelegramPostId = (url) => extractionOf(url, TelegramUrlWithPostIdRegExp.REG_EXP);

const correctInstagramLinks = [
  ['https://www.instagram.com/instagram/reel/C95Ex6yp7vl', 'C95Ex6yp7vl'],
  ['https://www.instagram.com/instagram/reel/C95Ex6yp7vl', 'C95Ex6yp7vl'],
  ['https://www.instagram.com/instagram/reel/C95Ex6yp7vl/', 'C95Ex6yp7vl'],
  ['https://www.instagram.com/instagram/p/C95Ex6yp7vl', 'C95Ex6yp7vl'],
  ['https://www.instagram.com/instagram/p/C95Ex6yp7vl/', 'C95Ex6yp7vl'],
  ['https://www.instagram.com/p/C57c1DWMkf_', 'C57c1DWMkf_'],
  ['https://www.instagram.com/p/C57c1DWMkf_/', 'C57c1DWMkf_'],
  ['https://www.instagram.com/reel/C57c1DWMkf_', 'C57c1DWMkf_'],
  ['https://www.instagram.com/reel/C57c1DWMkf_/', 'C57c1DWMkf_'],
  ['instagram.com/instagram/reel/C95Ex6yp7vl', 'C95Ex6yp7vl'],
  ['instagram.com/instagram/reel/C95Ex6yp7vl/', 'C95Ex6yp7vl'],
  ['instagram.com/instagram/p/C95Ex6yp7vl', 'C95Ex6yp7vl'],
  ['instagram.com/instagram/p/C95Ex6yp7vl/', 'C95Ex6yp7vl'],
  ['instagram.com/p/C57c1DWMkf_', 'C57c1DWMkf_'],
  ['instagram.com/p/C57c1DWMkf_/', 'C57c1DWMkf_'],
  ['instagram.com/reel/C57c1DWMkf_', 'C57c1DWMkf_'],
  ['instagram.com/reel/C57c1DWMkf_/', 'C57c1DWMkf_'],
];

const incorrectInstagramLinks = [
  'https://www.instagram.com/instagram/reel/',
  'instagram.com/instagram/reel//',
  'https://www.instagram.com/instagram/p/',
  'instagram.com/instagram/p//',
  'instagram.com/instagram/',
  'instagram.com',
];

const correctTelegramLinks = [
  ['https://t.me/karazinuniver1804/3674', 'karazinuniver1804/3674'],
  ['https://telegram.me/karazinuniver1804/3674', 'karazinuniver1804/3674'],
];

const incorrectTelegramLinks = [
  't.me/karazin.univer.1804/3674',
  'https://t.me/karazinuniver1804/3674/?',
  'https://t.me/karazinuniver1804/3674/?a=b&c=d&',
  'https://t.me/karazinuniver1804/3674/ ',
  't.me/karazinuniver1804/abc/',
  'https://telegram.me',
];

test.each(correctInstagramLinks)('From %s extracted %s', (link, expectedId) => {
  expect(extractionOfInstagramPostIdFrom(link)).toStrictEqual(expectedId);
});

test.each(incorrectInstagramLinks)('From %s extracted nothing as null', (incorrectLink) => {
  expect(extractionOfInstagramPostIdFrom(incorrectLink)).toBeNull();
});

test.each(correctTelegramLinks)('From %s extracted %s', (link, expectedId) => {
  expect(extractionOfTelegramPostId(link)).toStrictEqual(expectedId);
});

test.each(incorrectTelegramLinks)('From %s extracted nothing as null', (incorrectLink) => {
  expect(extractionOfTelegramPostId(incorrectLink)).toBeNull();
});

const invalidInputs = [
  [[]],
  [{}],
  [Symbol()],
  [BigInt(1)],
  [function () {}],
  [new Date()],
  [NaN],
  [Infinity],
  [0],
  [1],
  [1.25],
  [true],
  [false],
  [undefined],
  [null],
  [new Promise(() => true)],
];

test.each(invalidInputs)('Incorrect data types provided are thrown with error', (input) => {
  expect(() => extractionOf(input, null)).toThrowError();
});

const regExp = new RegExp(/\//);

test.each(invalidInputs)('Incorrect data types with provided RegExp are thrown with error', (input) => {
  expect(() => extractionOf(input, regExp)).toThrowError();
});
