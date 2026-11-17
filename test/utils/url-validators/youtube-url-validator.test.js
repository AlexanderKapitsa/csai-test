import { test, expect } from 'vitest';
import baseTestsWith from './base-tests.js';
import { YouTubeUrlValidator } from '@utils/src/utils/url-validators';

const validationOf = YouTubeUrlValidator.validate;

baseTestsWith(validationOf);

test('Links with and without protocols are truthy', () => {
  expect(
    validationOf('https://www.youtube.com/watch?v=U9t-slLl30E')
  ).toBeTruthy();
  expect(
    validationOf('http://www.youtube.com/watch?v=U9t-slLl30E')
  ).toBeTruthy();
  expect(validationOf('www.youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(validationOf('www.youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
});

test('Various domains are truthy', () => {
  expect(validationOf('www.youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(validationOf('m.youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(validationOf('music.youtube.com/watch?v=OD3F7J2PeYU')).toBeTruthy();
  expect(validationOf('youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(
    validationOf('www.youtube-nocookie.com/embed/U9t-slLl30E')
  ).toBeTruthy();
  expect(validationOf('youtu.be/U9t-slLl30E')).toBeTruthy();
});

test('Various paths for domains are truthy', () => {
  expect(validationOf('youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(validationOf('youtube.com/watch/U9t-slLl30E')).toBeTruthy();
  expect(validationOf('youtube.com/v/U9t-slLl30E')).toBeTruthy();
  expect(validationOf('youtube.com/embed/U9t-slLl30E')).toBeTruthy();
  expect(validationOf('youtube.com/e/U9t-slLl30E')).toBeTruthy();
  expect(validationOf('youtube.com/live/9UMxZofMNbA')).toBeTruthy();
  expect(validationOf('youtube.com/shorts/gOcxEMJSksg')).toBeTruthy();
  expect(
    validationOf(
      'youtube.com/oembed?url=http%3A//www.youtube.com/watch?v%3DU9t-slLl30E&format=json'
    )
  ).toBeTruthy();
  expect(
    validationOf(
      'youtube.com/attribution_link?a=JdfC0C9V6ZI&u=%2Fwatch%3Fv%3DU9t-slLl30E%26feature%3Dshare'
    )
  ).toBeTruthy();
  expect(
    validationOf(
      'youtube.com/attribution_link?a=8g8kPrPIi-ecwIsS&u=/watch%3Fv%3DU9t-slLl30E%26feature%3Dem-uploademail'
    )
  ).toBeTruthy();
});

test('Video ID is found in parameters successfully', () => {
  expect(validationOf('youtube.com/watch?v=U9t-slLl30E')).toBeTruthy();
  expect(
    validationOf('youtube.com/watch?v=U9t-slLl30E&feature=shared')
  ).toBeTruthy();
  expect(validationOf('youtube.com/watch?v=U9t-slLl30E&t=1m02s')).toBeTruthy();
  expect(
    validationOf(
      'youtube.com/watch?v=U9t-slLl30E&lc=UgyYsn3aIQWSA19Esi54AaABAg'
    )
  ).toBeTruthy();
  expect(
    validationOf(
      'youtube.com/watch?v=Lo2qQmj0_h4&list=PLmXxqSJJq-yVWpRFGImHYZBQTuBGLjG4t&index=5&pp=iAQB8AUB'
    )
  ).toBeTruthy();
  expect(
    validationOf('youtube.com/watch?feature=shared&v=U9t-slLl30E')
  ).toBeTruthy();
});

test('Short, wrong, deprecated and playlists are falsy', () => {
  expect(validationOf('youtube.com')).toBeFalsy();
  expect(validationOf('youtube.com/')).toBeFalsy();
  expect(validationOf('youtube.com//')).toBeFalsy();
  expect(validationOf('youtube.com/watch')).toBeFalsy();
  expect(validationOf('youtube.com/watch?')).toBeFalsy();
  expect(validationOf('youtube.com/watch?v=U$t-slLl30E')).toBeFalsy();
  expect(validationOf('youtube.com/watch?v=U9t-slLl30&t=10')).toBeFalsy();
  expect(validationOf('youtube.com/GitHub?v=U9t-slLl30E')).toBeFalsy();
  expect(validationOf('youtube.com/?v=U9t-slLl30E')).toBeFalsy();
  expect(validationOf('youtube.com/?vi=U9t-slLl30E')).toBeFalsy();
  expect(
    validationOf('youtube.com/?feature=player_embedded&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(validationOf('youtube.com/watch?vi=U9t-slLl30E')).toBeFalsy();
  expect(validationOf('youtube.com/vi/U9t-slLl30E')).toBeFalsy();
  expect(validationOf('youtube-nocookie.com/embed/U9t-slLl30E')).toBeFalsy();
  expect(
    validationOf('www.youtube-nocookie.com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf(
      'http://www.youtube-nocookie.com/v/U9t-slLl30E?version=3&hl=en_US&rel=0'
    )
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/playlist?list=PLmXxqSJJq-yVWpRFGImHYZBQTuBGLjG4t')
  ).toBeFalsy();
});

test('Link with spaces fails', () => {
  expect(
    validationOf('https ://www.youtube.com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https: //www.youtube.com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https:// www.youtube.com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www .youtube.com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube .com/watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/ watch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/watch ?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/watch? v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/watch?v =U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/watch?v= U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf(' https://www.youtube.com/watch?v=U9t-slLl30E ')
  ).toBeFalsy();
  expect(
    validationOf('https://www.youtube.com/ watch?v=U9t-slLl30E ')
  ).toBeFalsy();
  expect(
    validationOf(' https://www.youtube.com/w atch?v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('  https://www.youtube.com/watch?v=U9t-slLl30E  ')
  ).toBeFalsy();

  expect(
    validationOf('youtube .com/watch?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube. com/watch?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com /watch?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/ watch?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch ?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch? feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature= shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature=shared &v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature=shared&v= U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature=shared&v =U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature=shared&v=U9t-slLl30E ')
  ).toBeFalsy();
  expect(
    validationOf(' youtube.com/watch?feature=shared&v=U9t-slLl30E')
  ).toBeFalsy();
  expect(
    validationOf('youtube.com/watch?feature=shared&v=U9t-slLl30E ')
  ).toBeFalsy();
  expect(
    validationOf(' youtube.com/watch?feature=shared&v=U9t-slLl30E ')
  ).toBeFalsy();
  expect(
    validationOf('  youtube.com/watch?feature=shared&v=U9t-slLl30E  ')
  ).toBeFalsy();
});
