import { test, expect } from 'vitest';
import baseTestsWith from './base-tests.js';
import { InstagramUrlValidator } from '@utils/src/utils/url-validators/index.js';

const validationOf = InstagramUrlValidator.validate;

baseTestsWith(validationOf);

test('Link both with HTTPS and WWW is truthy', () => {
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_/')).toBeTruthy();
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_')).toBeTruthy();
  expect(
    validationOf('https://www.instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeTruthy();
  expect(
    validationOf('https://www.instagram.com/instagram/reel/C95Ex6yp7vl')
  ).toBeTruthy();
});

test('Link both with HTTP and WWW is truthy', () => {
  expect(validationOf('http://www.instagram.com/p/C57c1DWMkf_/')).toBeTruthy();
  expect(validationOf('http://www.instagram.com/p/C57c1DWMkf_')).toBeTruthy();
  expect(
    validationOf('http://www.instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeTruthy();
  expect(
    validationOf('http://www.instagram.com/instagram/reel/C95Ex6yp7vl')
  ).toBeTruthy();
});

test('Link without HTTPS or/and without WWW is truthy', () => {
  expect(validationOf('https://instagram.com/p/C57c1DWMkf_/')).toBeTruthy();
  expect(
    validationOf('https://instagram.com/taylorswift/p/C57c1DWMkf_')
  ).toBeTruthy();
  expect(validationOf('https://instagram.com/reel/C95Ex6yp7vl/')).toBeTruthy();
  expect(
    validationOf('https://instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeTruthy();

  expect(validationOf('www.instagram.com/p/C57c1DWMkf_/')).toBeTruthy();
  expect(
    validationOf('www.instagram.com/taylorswift/p/C57c1DWMkf_')
  ).toBeTruthy();
  expect(validationOf('www.instagram.com/reel/C95Ex6yp7vl/')).toBeTruthy();
  expect(
    validationOf('www.instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeTruthy();

  expect(validationOf('instagram.com/p/C57c1DWMkf_/')).toBeTruthy();
  expect(validationOf('instagram.com/taylorswift/p/C57c1DWMkf_')).toBeTruthy();
  expect(validationOf('instagram.com/reel/C95Ex6yp7vl/')).toBeTruthy();
  expect(
    validationOf('instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeTruthy();
});

test('Link with leading slashes is falsy', () => {
  expect(validationOf('//instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(
    validationOf('//instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeFalsy();

  expect(validationOf('//www.instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(
    validationOf('//www.instagram.com/instagram/reel/C95Ex6yp7vl/')
  ).toBeFalsy();
});

test('Incorrect domain is falsy', () => {
  expect(validationOf('https://www.insttagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('www.insrtagram.com/p/C57c1DWMkf_')).toBeFalsy();
  expect(validationOf('ldstagram.com/instagram/reel/C95Ex6yp7vl/')).toBeFalsy();
});

test('Empty post ID is falsy', () => {
  expect(validationOf('https://www.instagram.com/p//')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/')).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/instagram/reel//')
  ).toBeFalsy();
  expect(validationOf('https://www.instagram.com/instagram/reel/')).toBeFalsy();
});

test('No user and post ID is falsy', () => {
  expect(validationOf('https://www.instagram.com//')).toBeFalsy();
  expect(validationOf('https://www.instagram.com')).toBeFalsy();
});

test('Post ID of more than 1 symbol is truthy', () => {
  expect(validationOf('https://www.instagram.com/p/1/')).toBeTruthy();
  expect(validationOf('https://www.instagram.com/p/a/')).toBeTruthy();
  expect(validationOf('https://www.instagram.com/p/a1b2c3/')).toBeTruthy();
  expect(validationOf('https://www.instagram.com/p/c2b2a3/')).toBeTruthy();
});

test('Unknown post types are falsy', () => {
  expect(
    validationOf('https://www.instagram.com/super_new_post_type/C57c1DWMkf_/')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/super_new_post_type/C57c1DWMkf_')
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.instagram.com/instagram/super_new_post_type/C95Ex6yp7vl/'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.instagram.com/instagram/super_new_post_type/C95Ex6yp7vl'
    )
  ).toBeFalsy();
});

test('Link with URL parameters is falsy', () => {
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_/?')).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=b')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=b&c')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=b&c=')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=b&c=d')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_/?a=b&c=d&')
  ).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_?')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_?a')).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=b')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=b&c')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=b&c=')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=b&c=d')
  ).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/p/C57c1DWMkf_?a=b&c=d&')
  ).toBeFalsy();
});

test('Link with spaces fails', () => {
  expect(validationOf('https ://www.instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https: //www.instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https:// www.instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www .instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www. instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram .com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram. com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram.com /p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/ C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p /C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/ p/C57c1DWMkf_/')).toBeFalsy();
  expect(
    validationOf('https://www.instagram.com/ p /C57c1DWMkf_/')
  ).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_ /')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/ C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf(' https://www.instagram.com/p/C57c1DWMkf_/')).toBeFalsy();
  expect(validationOf('https://www.instagram.com/p/C57c1DWMkf_/ ')).toBeFalsy();
  expect(
    validationOf('  https://www.instagram.com/p/C57c1DWMkf_/   ')
  ).toBeFalsy();
});
