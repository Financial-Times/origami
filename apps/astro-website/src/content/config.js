import {z, defineCollection} from "astro:content"

const postsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		publishDate: z.date(),
		author: z.string(),
		tags: z.array(z.string()).optional(),
	}),
})

const principlesCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string(),
		cta: z.string(),
		nav_display: z.boolean(),
		nav_label: z.string(),
		nav_order: z.number(),
	}),
})

export const collections = {
	posts: postsCollection,
	documents: principlesCollection,
}
