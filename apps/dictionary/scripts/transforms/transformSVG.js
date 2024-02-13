export function transformSVG(token) {
	const encodedSVG = encodeURI(token.value);
	token.value = `url("data:image/svg+xml,${encodedSVG}")`;
	return token.value;
}
