export function capitaliseFirstLetter(string) {
	const firstLetter = string.charAt(0).toUpperCase()
	const remainingLetters = string.substring(1)
	return firstLetter + remainingLetters
}
