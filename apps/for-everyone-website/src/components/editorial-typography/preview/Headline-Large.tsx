import {Headline} from '@financial-times/o3-editorial-typography/esm';

function HeadlineLarge() {
	return (
		<>
			<meta itemProp="@preview" />
					<Headline underline={true} type='headline-large'>
						Don’t settle for black and white
					</Headline>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Headline-Large.tsx';

export {HeadlineLarge as preview};
