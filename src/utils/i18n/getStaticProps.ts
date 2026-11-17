import { client } from "tina/__generated__/client";

const collections = ["departments", "admissions", "faculty", "footer", "news", "speech"];

export async function getPageData(locale: string, slug: string) {
  let data = null;
  let foundCollection = null;

  for (const collection of collections) {
    const tinaProps = await client.queries[collection]({
      relativePath: `${locale}/${slug}.mdx`,
    });

    if (tinaProps?.data) {
      data = tinaProps.data;
      foundCollection = collection;
      break;
    }
  }

  if (!data) {
    return { notFound: true };
  }

  return { data, collection: foundCollection };
}