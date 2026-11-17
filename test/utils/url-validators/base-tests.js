import { test, expect } from 'vitest';
import { faker } from '@faker-js/faker';

export default (validationOf) => {
  test('Empty string is falsy', () => {
    expect(validationOf('')).toBeFalsy();
  });
  
  test('Gibberish is falsy', () => {
    expect(validationOf(faker.string.alpha(10))).toBeFalsy();
    expect(validationOf(faker.string.alphanumeric(10))).toBeFalsy();
    expect(validationOf(faker.internet.url())).toBeFalsy();
  });

  test('Incorrect data types provided are thrown with error', () => {
    expect(() => validationOf([])).toThrowError();
    expect(() => validationOf({})).toThrowError();
    expect(() => validationOf(Symbol())).toThrowError();
    expect(() => validationOf(BigInt(1))).toThrowError();
    expect(() => validationOf(function () {})).toThrowError();
    expect(() => validationOf(new Date())).toThrowError();
    expect(() => validationOf(NaN)).toThrowError();
    expect(() => validationOf(Infinity)).toThrowError();
    expect(() => validationOf(0)).toThrowError();
    expect(() => validationOf(1)).toThrowError();
    expect(() => validationOf(1.25)).toThrowError();
    expect(() => validationOf(true)).toThrowError();
    expect(() => validationOf(false)).toThrowError();
    expect(() => validationOf(undefined)).toThrowError();
    expect(() => validationOf(null)).toThrowError();
    expect(() => validationOf(new Promise(() => true))).toThrowError();
  });
};
