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
		custom_email_slug: z.string().optional(),
	}),
})

const documentsCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		description: z.string().optional(),
		cta: z.string().optional(),
		nav_display: z.boolean().optional(),
		nav_label: z.string().optional(),
		nav_order: z.number().optional(),
		collection_listing_display: z.boolean().optional(),
		collection_id: z.string().optional(),
	}),
})

export const collections = {
	posts: postsCollection,
	documentation: documentsCollection,
}
