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
