import {Heading} from '@financial-times/o3-editorial-typography/esm';

function Display() {
	return (
		<>
			<meta itemProp="@preview" />
			<Heading underline={true} type="display">
				Don’t settle for black and white
			</Heading>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Display.tsx';

export {Display as preview};
