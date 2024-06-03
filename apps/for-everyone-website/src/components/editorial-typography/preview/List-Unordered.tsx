import {List} from '@financial-times/o3-editorial-typography/esm';

function ListPreview() {
	return (
		//<preview>
		<List
			type="unordered"
			listItems={[
				'Lorem ipsum adipiscing elit.',
				'Sed feugiat turpis at massa tristique.',
				'Curabitu r accumsan elit luctus.',
			]}
		/>
		//</preview>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/List-Unordered.tsx';

export {ListPreview as preview};
