const transformImages = require('ft-n-content-transform').transformImages;

module.exports = (mainImage) => {
	// HACK to stop square / portrait images being too big
	const maxImageHeight = 394; // height of a 700 width image with 16:9 aspect ratio
	const ratio = mainImage.height / mainImage.width;
	if (ratio > 0.75 && mainImage.height > 394) {
		mainImage.height = maxImageHeight;
		mainImage.width = maxImageHeight * ratio;
	}

	const mainImageHTML =
	'<figure class="n-content-image">' +
	`<img src="${mainImage.url}" alt="${mainImage.title}" width="${mainImage.width}" height="${mainImage.height}">` +
	'</figure>';

	return transformImages(mainImageHTML);
};
