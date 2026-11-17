// Fix for paths in Markdown posts
// Credits: https://joschua.io/posts/2023/08/16/how-to-use-astro-assets-with-tina-cms/

// scripts/replaceAssetPaths.js

import util from 'util';
import { exec as exec0 } from 'child_process';

const exec = util.promisify(exec0);

// all .md files in this directory will be processed
// specify from the root of your project
const postsDirectory = '/src/pages/';

const pathsToReplace = [
  {
    find: '!\\[](</src/assets/',
    replace: '!\\[](<\\.\\./\\.\\./\\.\\./assets/',
  },
  {
    find: '!\\[](/src/assets/',
    replace: '!\\[](\\.\\./\\.\\./\\.\\./assets/',
  },
  {
    find: '/src/assets/',
    replace: '\\.\\./\\.\\./assets/',
  },
  {
    find: '/src/assets\\.\\./\\.\\./assets/',
    replace: '\\.\\./\\.\\./assets/',
  },
  /**
   * !DON'T TOUCH
   *
   * This and the following characters in "find" are not what
   * they appear to be. Check in IDE, there are two characters indeed (like і and   ̈  ).
   *
   * We have such wrong characters on content save in CMS after file upload in cyrillic
   * In case we still use TinaCMS in the future, please, never remove or comment these
   * lines even you don't recognise a problem.
   *
   * It took me a while to get to the solution.
   *
   * @author Dmytro "biggujo" Ivashchenko
   */
  {
    find: 'ї',
    replace: 'ї',
  },
  {
    find: 'Ї',
    replace: 'Ї',
  },
  {
    find: 'й',
    replace: 'й',
  },
  {
    find: 'Й',
    replace: 'Й',
  },
  {
    find: 'ё',
    replace: 'ё',
  },
  {
    find: 'Ё',
    replace: 'Ё',
  },
  /**
   * End of problematic characters
   */
  // {
  //   find: 'src\\: \\.\\./\\.\\./assets/',
  //   replace: 'src\\: \\.\\./\\.\\./src/assets/',
  // },
];

(async () => {
  for (const { find, replace } of pathsToReplace) {
    await replacePaths(find, replace);
  }
})();

// Special characters (https://en.wikipedia.org/wiki/Regular_expression#POSIX_basic_and_extended) need to be escaped

// execute bash command

async function replacePaths(find, replace) {
  return await exec(
    `(find ${process.cwd()}${postsDirectory} -type f -name '*.md?' -print0 | xargs -0 sed -i -e 's:${find}:${replace}:g')`
  );
}
