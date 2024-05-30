import {List} from '@financial-times/o3-editorial-typography/esm';

function ListPreview() {
	return (
		//<preview>
		<List
			type="ordered"
			listItems={[
				'Lorem ipsum adipiscing elit.',
				'Sed feugiat turpis at massa tristique.',
				'Curabitu r accumsan elit luctus.',
			]}
		/>
		//</preview>
	);
}

export {ListPreview as preview};
