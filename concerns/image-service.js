const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';
const OPTIONS = ['source=next', 'fit=scale-down', 'dpr=2'];

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 * @param {String} options
 */
export default function imageService(url, width, options) {
	const encoded = encodeURIComponent(url);
	const href = `${BASE_URL}/${encoded}?${OPTIONS.join('&')}&width=${width}`;
	return options ? href + '&' + options : href;
}
