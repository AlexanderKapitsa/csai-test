import { sortNewsByDate } from './sortNews';

export async function getPaginatedNews(category: string, paginate: any, newsPages: any) {
    // Фільтрація за категорією
    newsPages = newsPages.filter(
        ({ frontmatter: { category: pageCategory } }) => pageCategory === category
    );

    // Сортування за датою (спадання)
    newsPages = sortNewsByDate(newsPages);

    return paginate(newsPages, { pageSize: 4 });
}