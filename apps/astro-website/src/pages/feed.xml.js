import rss from "@astrojs/rss"
import {getCollection} from "astro:content"
import sanitizeHtml from "sanitize-html"
import MarkdownIt from "markdown-it"

import {generateBlogPostURL} from "@/helpers/utils"

const parser = new MarkdownIt()

//  rss feed at the moment does not support MDX (maybe we can make it work with a plugin)
export async function get(context) {
	const blog = await getCollection("posts")
	return rss({
		title: "Origami Newsletter",
		description:
			"Origami is a group of services, components, and tools used to help design & build digital products for FT brands.",
		site: context.site,
		items: blog.map(post => {
			return {
				title: post.data.title,
				pubDate: post.data.publishDate,
				description: post.data.description,
				content: sanitizeHtml(parser.render(post.body)),
				customData: post.data.customData,
				author: post.data.author,
				summary: post.data.tldr || post.data.description,
				// Compute RSS link from post `slug`
				// This example assumes all posts are rendered as `/blog/[slug]` routes
				link: `/blog/${generateBlogPostURL(post.slug)}/`,
			}
		}),
	})
}
