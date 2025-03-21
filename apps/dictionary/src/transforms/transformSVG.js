export function transformSVG(token) {
	const svg = token.original.value;
	const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;
	// Avoid encoding with single quotes.
	let encoded = svg.replace(/"/g, `'`);
	encoded = encoded.replace(/>\s{1,}</g, `><`);
	encoded = encoded.replace(/\s{2,}/g, ` `);
	encoded = encoded.replace(symbols, encodeURIComponent);
	return `url("data:image/svg+xml,${encoded}")`;
}
