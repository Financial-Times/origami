import {z, defineCollection} from "astro:content"

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		author: z.string(),
		tags: z.array(z.string()).optional(),
		tldr: z.string().optional(),
	}),
})

export const collections = {
	posts: postsCollection,
}
