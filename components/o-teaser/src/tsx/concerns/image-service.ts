const BASE_URL = 'https://images.ft.com/v3/image/raw';
const OPTIONS = {source: 'next', fit: 'scale-down', dpr: '2'};

type Options = {
	tint?: string;
	quality?: string;
};
export default function imageService(
	url: string,
	width: number,
	options: Options
) {
	const imageSrc = new URL(`${BASE_URL}/${encodeURIComponent(url)}`);
	imageSrc.search = new URLSearchParams({...OPTIONS, ...options}).toString();
	imageSrc.searchParams.set('width', width.toString());
	return imageSrc.href;
}
