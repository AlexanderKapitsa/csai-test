import { test, expect } from 'vitest';
import baseTestsWith from './base-tests.js';
import { TwitterUrlValidator } from '@utils/src/utils/url-validators/index.js';

const validationOf = TwitterUrlValidator.validate;

baseTestsWith(validationOf);

test('Link both with HTTPS and WWW is truthy', () => {
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf(
      'https://www.twitter.com/astrodotbuild/status/1511750228428435457'
    )
  ).toBeTruthy();
  expect(
    validationOf(
      'https://www.twitter.com/astrodotbuild/status/1511750228428435457/'
    )
  ).toBeTruthy();
});

test('Link both with HTTP and WWW is truthy', () => {
  expect(
    validationOf('http://www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('http://www.x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf(
      'http://www.twitter.com/astrodotbuild/status/1511750228428435457'
    )
  ).toBeTruthy();
  expect(
    validationOf(
      'http://www.twitter.com/astrodotbuild/status/1511750228428435457/'
    )
  ).toBeTruthy();
});

test('Link without HTTPS or/and without WWW is truthy', () => {
  expect(
    validationOf('https://x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('https://x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf('https://twitter.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf(
      'https://twitter.com/astrodotbuild/status/1511750228428435457/'
    )
  ).toBeTruthy();

  expect(
    validationOf('http://x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('http://x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf('http://twitter.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('http://twitter.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();

  expect(
    validationOf('www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('www.x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf('www.twitter.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('www.twitter.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();

  expect(
    validationOf('x.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('x.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
  expect(
    validationOf('twitter.com/astrodotbuild/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('twitter.com/astrodotbuild/status/1511750228428435457/')
  ).toBeTruthy();
});

test('Link with leading slashes is falsy', () => {
  expect(
    validationOf('//x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('//twitter.com/astrodotbuild/status/1511750228428435457/')
  ).toBeFalsy();

  expect(
    validationOf('//www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('//www.twitter.com/astrodotbuild/status/1511750228428435457/')
  ).toBeFalsy();
});

test('Incorrect domain is falsy', () => {
  expect(
    validationOf('https://www.b.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://twttier.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('twittee.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
});

test('Incorrect post type is falsy', () => {
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/super_new_status_type/1511750228428435457'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.twitter.com/astrodotbuild/super_new_status_type/1511750228428435457'
    )
  ).toBeFalsy();
});

test('Empty post ID is falsy', () => {
  expect(validationOf('https://x.com/astrodotbuild/status/')).toBeFalsy();
  expect(validationOf('https://x.com/astrodotbuild/status//')).toBeFalsy();
  expect(validationOf('https://twitter.com/astrodotbuild/status/')).toBeFalsy();
  expect(
    validationOf('https://twitter.com/astrodotbuild/status//')
  ).toBeFalsy();
});

test('Empty username is falsy', () => {
  expect(validationOf('https://x.com//status/1511750228428435457')).toBeFalsy();
  expect(
    validationOf('https://twitter.com//status/1511750228428435457')
  ).toBeFalsy();
  expect(validationOf('https://x.com/status/1511750228428435457')).toBeFalsy();
  expect(
    validationOf('https://twitter.com/status/1511750228428435457')
  ).toBeFalsy();
});

test('No user and post ID is falsy', () => {
  expect(validationOf('https://www.x.com')).toBeFalsy();
  expect(validationOf('https://www.x.com/')).toBeFalsy();
  expect(validationOf('https://www.x.com//')).toBeFalsy();
  expect(validationOf('https://www.x.com///')).toBeFalsy();
  expect(validationOf('https://www.x.com////')).toBeFalsy();
  expect(validationOf('https://www.twitter.com')).toBeFalsy();
  expect(validationOf('https://www.twitter.com/')).toBeFalsy();
  expect(validationOf('https://www.twitter.com//')).toBeFalsy();
  expect(validationOf('https://www.twitter.com///')).toBeFalsy();
  expect(validationOf('https://www.twitter.com////')).toBeFalsy();
});

test('Post ID of numbers is truthy', () => {
  expect(validationOf('https://www.x.com/astrodotbuild/status/1')).toBeTruthy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/12')
  ).toBeTruthy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/123')
  ).toBeTruthy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1345678909765421')
  ).toBeTruthy();
  expect(
    validationOf('https://www.twitter.com/astrodotbuild/status/1')
  ).toBeTruthy();
  expect(
    validationOf('https://www.twitter.com/astrodotbuild/status/12')
  ).toBeTruthy();
  expect(
    validationOf('https://www.twitter.com/astrodotbuild/status/123')
  ).toBeTruthy();
  expect(
    validationOf(
      'https://www.twitter.com/astrodotbuild/status/1345678909765421'
    )
  ).toBeTruthy();
});

test('Post ID of characters is falsy', () => {
  expect(validationOf('https://www.x.com/astrodotbuild/status/c')).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/cm^t34850ct7834')
  ).toBeFalsy();
  expect(
    validationOf('https://www.twitter.com/astrodotbuild/status/$')
  ).toBeFalsy();
  expect(
    validationOf('https://www.twitter.com/astrodotbuild/status/v3489ydu4986y')
  ).toBeFalsy();
});

test('Correct usernames are truthy', () => {
  expect(
    validationOf('https://www.x.com/abcdef123_123/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('https://www.x.com/a_bc_def/status/1511750228428435457')
  ).toBeTruthy();
  expect(
    validationOf('https://www.x.com/1235/status/1511750228428435457')
  ).toBeTruthy();
});

test('Incorrect usernames are falsy', () => {
  expect(
    validationOf('https://www.x.com/yr.rret.ert/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/abcd^efgh/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/12&3/status/1511750228428435457')
  ).toBeFalsy();
});

test('Link with URL parameters is falsy', () => {
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457/?')
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a='
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a=b'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a=b&c'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a=b&c='
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a=b&c=d'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457/?a=b&c=d&'
    )
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457?')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457?a')
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a='
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a=b'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a=b&c'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a=b&c='
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a=b&c=d'
    )
  ).toBeFalsy();
  expect(
    validationOf(
      'https://www.x.com/astrodotbuild/status/1511750228428435457?a=b&c=d&'
    )
  ).toBeFalsy();
});

test('X link with spaces fails', () => {
  expect(
    validationOf('https ://www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https: //www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https:// www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www .x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www. x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x .com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x. com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com /astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/ astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild /status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/ status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status /1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/ 1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457 /')
  ).toBeFalsy();
  expect(
    validationOf(' https://www.x.com/astrodotbuild/status/1511750228428435457')
  ).toBeFalsy();
  expect(
    validationOf('https://www.x.com/astrodotbuild/status/1511750228428435457 ')
  ).toBeFalsy();
  expect(
    validationOf(
      '  https://www.x.com/astrodotbuild/status/1511750228428435457   '
    )
  ).toBeFalsy();
});
