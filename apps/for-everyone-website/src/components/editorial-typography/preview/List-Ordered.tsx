import {List} from '@financial-times/o3-editorial-typography/esm';

function ListPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<List
				type="ordered"
				listItems={[
					'Lorem ipsum adipiscing elit.',
					'Sed feugiat turpis at massa tristique.',
					'Curabitu r accumsan elit luctus.',
				]}
			/>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/List-Ordered.tsx';

export {ListPreview as preview};
