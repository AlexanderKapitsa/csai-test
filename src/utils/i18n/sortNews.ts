export function sortNewsByDate(newsPages: any[]) {
    return newsPages.sort((a, b) => {
        const dateA = a.frontmatter.createdAt ? new Date(a.frontmatter.createdAt).getTime() : 0;
        const dateB = b.frontmatter.createdAt ? new Date(b.frontmatter.createdAt).getTime() : 0;
        return dateB - dateA;
    });
}