import {Link, Body} from '@financial-times/o3-editorial-typography/esm';

function LinkPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Body>
				An article by <Link href="https://ft.com">The Financial Times</Link>.
			</Body>
			<meta itemProp="@preview" />
		</>
	);
}
export const filePath = 'src/components/editorial-typography/preview/Link.tsx';

export {LinkPreview as preview};
