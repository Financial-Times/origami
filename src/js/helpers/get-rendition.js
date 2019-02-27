import supportedFormats from './supported-formats';

function getRendition(renditions, options) {
	// allow mocking of supported formats module
	const opts = options || {};
	const width = opts.optimumvideowidth;
	const formats = opts.supportedFormats || supportedFormats();
	let appropriateRendition;
	// order smallest to largest
	const orderedRenditions = renditions
		.filter(rendition => {
			return formats.indexOf(rendition.codec.toLowerCase()) > -1;
		})
		.sort((renditionOne, renditionTwo) => {
			return renditionOne.pixelWidth - renditionTwo.pixelWidth;
		});

	// if no width supplied, get largest
	if (!width) {
		return orderedRenditions.pop();
	}
	// NOTE: rather use find...
	orderedRenditions.some(rendition => {
		if (rendition.pixelWidth >= width) {
			appropriateRendition = rendition;
			return true;
		}
		return false;
	});

	return appropriateRendition || orderedRenditions.pop();
}

export default getRendition;
export {getRendition};
