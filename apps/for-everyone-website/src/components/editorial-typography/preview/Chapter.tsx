import {Headline} from '@financial-times/o3-editorial-typography/esm';

function Chapter() {
	return (
		<>
			<meta itemProp="@preview" />
					<Headline type='chapter'>
						Don’t settle for black and white
					</Headline>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Chapter.tsx';

export {Chapter as preview};
