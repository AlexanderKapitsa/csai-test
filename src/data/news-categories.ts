export function getNewsCategories(locale: string, t: (key: string) => string) {
  return [
    {
      title: `${t('news.categories.all')}`,
      baseUrl: `/news/${locale}`,
    },
    {
      title: `${t('news.categories.education')}`,
      baseUrl: `/news/${locale}/education`,
    },
    {
      title: `${t('news.categories.culture')}`,
      baseUrl: `/news/${locale}/culture`,
    },
    {
      title: `${t('news.categories.science')}`,
      baseUrl: `/news/${locale}/science`,
    },
    {
      title: `${t('news.categories.international')}`,
      baseUrl: `/news/${locale}/international`,
    },
    {
      title: `${t('news.categories.achievements')}`,
      baseUrl: `/news/${locale}/achievements`,
    },
    {
      title: `${t('news.categories.projects')}`,
      baseUrl: `/news/${locale}/projects`,
    },
  ];
}
