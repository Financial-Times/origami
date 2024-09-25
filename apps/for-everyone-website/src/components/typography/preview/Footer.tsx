import {Footer} from '@financial-times/o3-foundation/esm';

function FooterPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Footer>Footer such as copyright notice.</Footer>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/typography/preview/Footer.tsx';

export {FooterPreview as preview};
