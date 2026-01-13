import { getCollection } from 'astro:content'
import rss from '@astrojs/rss'

export async function GET(context) {
    const articles = await getCollection('articles')
    return rss({
        title: 'ludvigsandberg',
        description: 'reverse engineering, low level coding',
        site: context.site,
        items: articles.map((article) => ({
            ...article.data,
            link: `/article/${article.id}/`,
        })),
    })
}
