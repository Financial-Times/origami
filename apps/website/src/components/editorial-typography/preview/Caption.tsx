import {Caption} from '@financial-times/o3-editorial-typography/esm';

function CaptionPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<Caption>&#169; Lorem John Doe</Caption>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Caption.tsx';

export {CaptionPreview as preview};
