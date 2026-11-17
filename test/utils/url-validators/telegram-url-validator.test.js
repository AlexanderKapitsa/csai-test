import { test, expect } from 'vitest';
import baseTestsWith from './base-tests.js';
import { TelegramUrlValidator } from '@utils/src/utils/url-validators/index.js';

const validationOf = TelegramUrlValidator.validate;

baseTestsWith(validationOf);

test('Link with HTTPS is truthy', () => {
  expect(validationOf('https://t.me/karazinuniver1804/3674')).toBeTruthy();
  expect(validationOf('https://t.me/karazinuniver1804/3674/')).toBeTruthy();
  expect(
    validationOf('https://telegram.me/karazinuniver1804/3674')
  ).toBeTruthy();
  expect(
    validationOf('https://telegram.me/karazinuniver1804/3674/')
  ).toBeTruthy();
});

test('Link with HTTPS is truthy', () => {
  expect(validationOf('http://t.me/karazinuniver1804/3674')).toBeTruthy();
  expect(validationOf('http://t.me/karazinuniver1804/3674/')).toBeTruthy();
  expect(
    validationOf('http://telegram.me/karazinuniver1804/3674')
  ).toBeTruthy();
  expect(
    validationOf('http://telegram.me/karazinuniver1804/3674/')
  ).toBeTruthy();
});

test('Link without HTTPS is truthy', () => {
  expect(validationOf('t.me/karazinuniver1804/3674')).toBeTruthy();
  expect(validationOf('telegram.me/karazinuniver1804/3674')).toBeTruthy();
});

test('Link with WWW is falsy (Telegram does not support it)', () => {
  expect(validationOf('https://www.t.me/karazinuniver1804/3674')).toBeFalsy();
  expect(
    validationOf('https://www.telegram.me/karazinuniver1804/3674')
  ).toBeFalsy();
});

test('Link with leading slashes is falsy', () => {
  expect(validationOf('//t.me/karazinuniver1804/3674')).toBeFalsy();
  expect(validationOf('//telegram.me/karazinuniver1804/3674')).toBeFalsy();
});

test('Incorrect domain is falsy', () => {
  expect(validationOf('f.me/karazinuniver1804/3674')).toBeFalsy();
  expect(validationOf('telleram.me/karazinuniver1804/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804.g.me/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804.telegarm.me/3674')).toBeFalsy();
  expect(validationOf('https://f.me/karazinuniver1804/3674')).toBeFalsy();
  expect(
    validationOf('https://telleram.me/karazinuniver1804/3674')
  ).toBeFalsy();
  expect(validationOf('https://karazinuniver1804.g.me/3674')).toBeFalsy();
  expect(
    validationOf('https://karazinuniver1804.telegarm.me/3674')
  ).toBeFalsy();
});

test('Link with no domain with leading nickname is falsy', () => {
  expect(validationOf('karazinuniver1804.me/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804.me/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804.t/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804.t/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804./3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804./3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804/3674')).toBeFalsy();
  expect(validationOf('karazinuniver1804/3674')).toBeFalsy();
});

test('Link with empty post ID is falsy', () => {
  expect(validationOf('https://t.me/karazinuniver1804/')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804//')).toBeFalsy();
});

test('Link with empty nickname is falsy', () => {
  expect(validationOf('https://t.me//3674')).toBeFalsy();
  expect(validationOf('https://t.me/3674/')).toBeFalsy();
});

test('Link with neither with nickname nor post ID is falsy', () => {
  expect(validationOf('https://telegram.com')).toBeFalsy();
  expect(validationOf('https://telegram.com/')).toBeFalsy();
  expect(validationOf('https://telegram.com//')).toBeFalsy();
  expect(validationOf('https://telegram.com///')).toBeFalsy();
  expect(validationOf('https://telegram.com////')).toBeFalsy();
  expect(validationOf('https://t.me')).toBeFalsy();
  expect(validationOf('https://t.me/')).toBeFalsy();
  expect(validationOf('https://t.me//')).toBeFalsy();
  expect(validationOf('https://t.me///')).toBeFalsy();
  expect(validationOf('https://t.me////')).toBeFalsy();
  expect(validationOf('https://telegram.me')).toBeFalsy();
  expect(validationOf('https://telegram.me/')).toBeFalsy();
  expect(validationOf('https://telegram.me//')).toBeFalsy();
  expect(validationOf('https://telegram.me///')).toBeFalsy();
  expect(validationOf('https://telegram.me////')).toBeFalsy();
});

test('Post ID of numbers is truthy', () => {
  expect(validationOf('t.me/karazinuniver1804/1/')).toBeTruthy();
  expect(validationOf('t.me/karazinuniver1804/12/')).toBeTruthy();
  expect(validationOf('t.me/karazinuniver1804/123/')).toBeTruthy();
  expect(
    validationOf('t.me/karazinuniver1804/1234567890987654321/')
  ).toBeTruthy();
});

test('Post ID of characters is falsy', () => {
  expect(validationOf('t.me/karazinuniver1804/c/')).toBeFalsy();
  expect(validationOf('t.me/karazinuniver1804/abc/')).toBeFalsy();
  expect(validationOf('t.me/karazinuniver1804/c904j9g4/')).toBeFalsy();
});

test('Correct usernames are truthy', () => {
  expect(validationOf('t.me/karazinuniver/3674')).toBeTruthy();
  expect(validationOf('t.me/karazinuniver1804/3674')).toBeTruthy();
  expect(validationOf('t.me/karazinuniver-1804/3674')).toBeTruthy();
  expect(validationOf('t.me/karazinuniver_1804/3674')).toBeTruthy();
});

test('Incorrect usernames are falsy', () => {
  expect(validationOf('t.me/karazin.univer.1804/3674')).toBeFalsy();
  expect(validationOf('t.me/karazinuniver#1804/3674')).toBeFalsy();
});

test('Link with URL parameters is falsy', () => {
  expect(validationOf('https://t.me/karazinuniver1804/3674/?')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674/?a')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674/?a=')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674/?a=b')).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674/?a=b&c')
  ).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674/?a=b&c=')
  ).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674/?a=b&c=d')
  ).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674/?a=b&c=d&')
  ).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674?')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674?a')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674?a=')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674?a=b')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674?a=b&c')).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674?a=b&c=')
  ).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674?a=b&c=d')
  ).toBeFalsy();
  expect(
    validationOf('https://t.me/karazinuniver1804/3674?a=b&c=d&')
  ).toBeFalsy();
});

test('Link with spaces fails', () => {
  expect(validationOf('https ://t.me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https: //t.me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https:// t.me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t .me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t. me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t.me /karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t.me/ karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804 /3674/')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/ 3674/')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674 /')).toBeFalsy();
  expect(validationOf(' https://t.me/karazinuniver1804/3674/')).toBeFalsy();
  expect(validationOf('https://t.me/karazinuniver1804/3674/ ')).toBeFalsy();
  expect(validationOf('  https://t.me/karazinuniver1804/3674/   ')).toBeFalsy();
});
