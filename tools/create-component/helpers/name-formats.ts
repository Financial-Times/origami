export const lowercase = (string) => string.toLowerCase()
export const titleCase = (string) =>
	string
		.split('-')
		.map((word) => word.replace(word[0], word[0].toUpperCase()))
		.join('')
export const camelCase = (string) =>
	string.replace(/\-+(.)/g, (match, chr) => chr.toUpperCase())
export const withoutPrefix = (string) => string.replace(/^[a-z]-/g, '')
