const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';
const OPTIONS = Object.freeze({
  source: 'next',
  fit: 'scale-down',
  dpr: 2,
});

/**
 * Image Service
 * @param {String} url
 * @param {Number} width
 * @param {String} options
 */
export default function imageService(url, width, options) {
  const imageSrc = new URL(`${BASE_URL}/${encodeURIComponent(url)}`);
	imageSrc.search = new URLSearchParams({...OPTIONS, ...options });
	imageSrc.searchParams.set('width', width);
	return imageSrc.href;
}
