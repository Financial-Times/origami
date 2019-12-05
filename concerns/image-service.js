const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw/';
const DEFAULT_OPTIONS = {
	source: 'next',
	fit: 'scale-down',
	quality: 'medium',
	dpr: 2
};

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 * @param {String} options
 */
export default function imageService(url, width, options = {}) {
	const encoded = encodeURIComponent(url);
	const imageServiceUrl = new URL(encoded, BASE_URL);
	imageServiceUrl.search = new URLSearchParams({
		...DEFAULT_OPTIONS,
		...options,
		width
	});

	return imageServiceUrl.toString();
}
