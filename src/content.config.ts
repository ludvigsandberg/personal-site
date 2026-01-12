import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'

const articles = defineCollection({
    loader: glob({ base: './src/content/article', pattern: '**/*.{md,mdx}' }),

    schema: () =>
        z.object({
            title: z.string(),
            date: z.coerce.date(),
            updated: z.coerce.date().optional(),
        }),
})

export const collections = { articles }
