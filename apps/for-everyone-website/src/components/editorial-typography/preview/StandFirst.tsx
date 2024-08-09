import {StandFirst} from '@financial-times/o3-editorial-typography/esm';

function StandFirstPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<StandFirst>StandFirst</StandFirst>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/StandFirst.tsx';

export {StandFirstPreview as preview};
