export function capitaliseFirstLetter(string) {
	const firstLetter = string.charAt(0).toUpperCase()
	const remainingLetters = string.substring(1)
	return firstLetter + remainingLetters
}

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

export function createSecondaryNavBarChildren(childrenArray, path) {
	return childrenArray?.map(child => {
		return {
			label: capitaliseFirstLetter(child),
			url: `${path}/${child}`,
		}
	})
}
