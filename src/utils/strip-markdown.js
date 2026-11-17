import { remark } from 'remark';
import strip from 'strip-markdown';

function stripFrontmatter(str) {
  const blocks = String(str).split('---');
  if (blocks.length > 2) {
    const bodyBlocks = blocks.slice(2);
    return bodyBlocks.join('---');
  }
  return blocks.at(-1);
}

async function stripTags(str) {
  return await remark().use(strip).process(str);
}

export default async function getOnlyBodyTextFromMarkdownContent(
  markdownContent
) {
  markdownContent = stripFrontmatter(markdownContent);
  markdownContent = await stripTags(markdownContent);

  return markdownContent;
}
