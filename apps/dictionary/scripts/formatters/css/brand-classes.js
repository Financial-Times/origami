import StyleDictionary from "style-dictionary"
const {fileHeader, createPropertyFormatter} = StyleDictionary.formatHelpers

export function brandClasses({dictionary, file, options}) {
	const {outputReferences, includePrefix, classNames} = options
	if (includePrefix && !Array.isArray(includePrefix)) {
		throw new Error("includeFiles must be array")
	}

	const outputClassName = classNames.reduce(
		(acc, className) => `${acc}.${className} `,
		""
	)
	const formatProperty = createPropertyFormatter({
		outputReferences,
		dictionary,
		format: "css",
	})

	const brandTokens = []

	//Extract brand tokens only.
	dictionary.allTokens.forEach(token => {
		if (includePrefix) {
			const includePattern = new RegExp(`^_?(${includePrefix.join("|")})`, "g")

			if (!token.name.match(includePattern)) {
				return
			}
		}
		brandTokens.push(formatProperty(token))
	})

	return (
		`${fileHeader({file})}\n` +
		`${outputClassName}{\n` +
		`${brandTokens.join("\n")}\n}\n`
	)
}
