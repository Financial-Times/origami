const path = require('path');
const fs = require('fs-extra');

// https://github.com/yoksel/url-encoder/blob/a3924f05b358eb73bd60312e6f9422340f0495c4/src/js/script.js#L133
function encodeSVG (data) {
	const symbols = /[\r\n%#()<>?[\\\]^`{|}]/g;
	data = data.replace(/"/g, `'`);
	data = data.replace(/>\s{1,}</g, `><`);
	data = data.replace(/\s{2,}/g, ` `);

	// Using encodeURIComponent() as replacement function
	// allows to keep result code readable
	return data.replace(symbols, encodeURIComponent);
}

module.exports = {
	type: `value`,
	matcher: (token) => token.attributes.category === `image`,
	transformer: (token) => {
		const { name, value } = token;

		const tokenPath = path.dirname(token.filePath);
		const imagePath = path.join(tokenPath, value);

		const src = (fs.readFileSync(imagePath)).toString();
		const encoded = encodeSVG(
			src.replace(' xmlns=', ' fill="var(--o-icons-color)" xmlns=')
		);

		return `url("data:image/svg+xml,${encoded}")`;
	}
}
