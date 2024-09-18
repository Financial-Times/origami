import {Body, Link} from '@financial-times/o3-foundation/esm';

function LinkPreview() {
	return (
		<>
			<Body>
				This is example of <meta itemProp="@preview" />
				<Link href="https://origami.ft.com">
					Standard Links
				</Link>
				<meta itemProp="@preview" />.
			</Body>
		</>
	);
}

export const filePath = 'src/components/typography/preview/Link.tsx';

export {LinkPreview as preview};
