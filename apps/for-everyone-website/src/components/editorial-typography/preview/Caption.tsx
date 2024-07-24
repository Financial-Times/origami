import {Caption as CaptionTsx} from '@financial-times/o3-editorial-typography/esm';

function Caption() {
	return (
		<>
			<meta itemProp="@preview" />
			<CaptionTsx>&#169; Lorem John Doe</CaptionTsx>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Caption.tsx';

export {Caption as preview};
