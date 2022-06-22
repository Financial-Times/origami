const BASE_URL = 'https://www.ft.com/__origami/service/image/v2/images/raw';
const OPTIONS = {source: 'next', fit: 'scale-down', dpr: 2};

type Options = {
	source: string;
	fit: string;
	dpr: number;
};

export default function imageService(
	url: string,
	width: number,
	options: Options
) {
	const imageSrc = new URL(`${BASE_URL}/${encodeURIComponent(url)}`);
	imageSrc.search = new URLSearchParams({...OPTIONS, ...options});
	imageSrc.searchParams.set('width', width);
	return imageSrc.href;
}
