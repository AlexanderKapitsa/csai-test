import { getPageData } from "@utils/i18n/getStaticProps";

export const getStaticProps = async ({ params }) => {
  const { locale, slug } = params;
  return getPageData(locale, slug);
};