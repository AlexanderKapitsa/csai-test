// scripts/replaceAssetPaths.js

import util from 'util';
import { exec as exec0 } from 'child_process';
import path from 'path';
import fs from 'fs';

const exec = util.promisify(exec0);

// all .md files in this directory will be processed
// specify from the root of your project
const postsDirectory = path.join(process.cwd(), 'src/pages');

const pathsToReplace = [
  {
    find: '!\\[]\\(/src/assets/',
    replace: '![](../../../assets/',
  },
  {
    find: '!\\[]\\(</src/assets/',
    replace: '![](<../../../assets/',
  },
  {
    find: '/src/assets/',
    replace: '../../assets/',
  },
  {
    find: '/src/assets../../assets/',
    replace: '../../assets/',
  },
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
];

(async () => {
  for (const { find, replace } of pathsToReplace) {
    await replacePaths(find, replace);
  }
})();

async function replacePaths(find, replace) {
  const files = await getMarkdownFiles(postsDirectory);

  for (const file of files) {
    const content = await fs.promises.readFile(file, 'utf-8');

    const updatedLines = content
      .split('\n')
      .map((line) => line.replace(new RegExp(find, 'g'), replace));

    const updatedContent = updatedLines.join('\n');
    await fs.promises.writeFile(file, updatedContent, 'utf-8');
  }
}

async function getMarkdownFiles(dir) {
  const subdirs = await fs.promises.readdir(dir);
  const files = await Promise.all(
    subdirs.map(async (subdir) => {
      const res = path.resolve(dir, subdir);
      return (await fs.promises.stat(res)).isDirectory()
        ? getMarkdownFiles(res)
        : res;
    })
  );
  return files
    .flat()
    .filter((file) => file.endsWith('.md') || file.endsWith('.mdx'));
}
