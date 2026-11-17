import { test, expect } from 'vitest';
import { DimensionConstrainer } from '@utils/src/utils/dimension-constrainer/index.js';

const DIGITS_AFTER_COMMA = 2;

const createInstanceOf = DimensionConstrainer.fromMaxDimensions;

(() => {
  const instance = createInstanceOf({
    width: 280,
    height: 400,
  });

  const widthHeightExpected = [
    [1, 1, 1],
    [100, 50, 100],
    [50, 100, 50],
    [279, 399, 279],
    [280, 400, 280],
    [281, 400, 280],
    [280, 401, 279.301745632],
    [1920, 1080, 280],
    [280, 400, 280],
    [560, 800, 280],
    [1280, 720, 280],
    [1440, 2560, 225],
    [320, 240, 280],
    [500, 1000, 200],
    [800, 1200, 266.6666],
    [1600, 2400, 266.6666],
    [1, 1000, 0.4],
    [1000, 1, 280],
    [2, 800, 1],
    [1000, 2, 280],
    [10, 1000, 4],
    [1000, 10, 280],
    [50, 1000, 20],
    [1000, 50, 280],
    [1, 500, 0.8],
    [500, 1, 280],
  ];

  test.each(widthHeightExpected)(
    `Instance of max [280;400] resizes [%i,%i] to the width of %i`,
    (width, height, expectedWidth) => {
      expect(instance.getConstrainedWidth(width, height)).toBeCloseTo(
        expectedWidth,
        DIGITS_AFTER_COMMA
      );
    }
  );
})();

(() => {
  const instance = createInstanceOf({
    width: 400,
    height: 280,
  });

  const widthHeightExpected = [
    [1, 1, 1],
    [100, 50, 100],
    [50, 100, 50],
    [279, 399, 195.789],
    [280, 400, 196],
    [281, 400, 196.7],
    [280, 401, 195.511],
    [1920, 1080, 400],
    [280, 400, 196],
    [560, 800, 196],
    [1280, 720, 400],
    [1440, 2560, 157.5],
    [320, 240, 320],
    [500, 1000, 140],
    [800, 1200, 186.667],
    [1600, 2400, 186.667],
    [1, 1000, 0.28],
    [1000, 1, 400],
    [2, 800, 0.7],
    [1000, 2, 400],
    [10, 1000, 2.8],
    [1000, 10, 400],
    [50, 1000, 14],
    [1000, 50, 400],
    [1, 500, 0.56],
    [500, 1, 400],
  ];

  test.each(widthHeightExpected)(
    `Instance of max [280;400] resizes [%i,%i] to the width of %i`,
    (width, height, expectedWidth) => {
      expect(instance.getConstrainedWidth(width, height)).toBeCloseTo(
        expectedWidth,
        DIGITS_AFTER_COMMA
      );
    }
  );
})();

const invalidConstructorParameters = [
  {
    width: '',
    height: 1,
  },
  {
    width: 1,
    height: '',
  },
  {
    width: null,
    height: null,
  },
  {
    width: undefined,
    height: undefined,
  },
  {
    width: new RegExp(''),
    height: new RegExp(''),
  },
  null,
];

test.each(invalidConstructorParameters)(
  'Invalid parameters throw an error',
  (parameters) => {
    expect(() => createInstanceOf(parameters)).toThrowError();
  }
);

const unsafeIntegers = [
  {
    width: -9007199254740993,
    height: +9007199254740993,
  },
];

const nonIntegers = [
  {
    width: NaN,
    height: NaN,
  },
  {
    width: -Infinity,
    height: Infinity,
  },
];

test.each(unsafeIntegers)(
  'Unsafe integers as constructor parameters throw an error',
  (parameters) => {
    expect(() => createInstanceOf(parameters)).toThrowError();
  }
);

test.each(nonIntegers)(
  'Non-integers as constructor parameters throw an error',
  (parameters) => {
    expect(() => createInstanceOf(parameters)).toThrowError();
  }
);
