import {getCollection} from "astro:content"

export function formatDateString(date) {
	const months = [
		"January",
		"February",
		"march",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	]
	const newDate = new Date(date)
	const year = newDate.getFullYear()
	const month = months[newDate.getMonth()]
	const day = newDate.getDate()
	return `${day} ${month} ${year}`
}

export function convertToSlug(Text) {
	return Text.toLowerCase()
		.replace(/ /g, "-")
		.replace(/[^\w-]+/g, "")
}

export function generateBlogPostURL(slug) {
	return slug.replace(/([\d]{4})-([\d]{2})-([\d]{2})-(.*)/g, "$1/$2/$3/$4")
}

export function filterAndSortNavbars(components) {
	return components
		.filter(ctx => ctx.data.collection_listing_display !== false)
		.sort((a, b) => {
			return a.data.nav_order < b.data.nav_order ? -1 : 1
		})
}

export async function getComponentDataFromContent(
	collectionName,
	collectionFilterCallback
) {
	const components = await getCollection(
		collectionName,
		collectionFilterCallback
	)
	const componentsToRender = filterAndSortNavbars(components)
	return componentsToRender
}

export function getBrandFromLocale(lang) {
	switch (lang) {
		case "en-GB-x-prof":
			return "professional"
		case "en-GB-x-sv":
			return "sustainable-views"
		case "en-GB-x-internal":
			return "internal"
		case "en-GB-x-wl":
			return "whitelabel"
		case "en-GB-x-core":
		default:
			return "core"
	}
}
