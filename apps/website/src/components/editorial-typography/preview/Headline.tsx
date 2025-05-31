import {Heading} from '@financial-times/o3-editorial-typography/esm';

function HeadlinePreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Heading type="headline">Don’t settle for black and white</Heading>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Headline.tsx';

export {HeadlinePreview as preview};
