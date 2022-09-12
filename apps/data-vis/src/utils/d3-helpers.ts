export const calculateGridPos = (i: number, perRow: number, pathWidth: number) => {
	return [
		((i % perRow) + 0.5) * pathWidth,
		(Math.floor(i / perRow) + 0.5) * pathWidth,
	]
}
