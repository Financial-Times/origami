import {Headline} from '@financial-times/o3-editorial-typography/esm';

function HeadlinePreview() {
	return (
		<>
			<meta itemProp="@preview" />
					<Headline type="headline">
						Don’t settle for black and white
					</Headline>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Headline.tsx';

export {HeadlinePreview as preview};
