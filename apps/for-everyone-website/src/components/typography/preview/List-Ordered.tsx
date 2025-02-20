import {OrderedList} from '@financial-times/o3-foundation/esm';

function ListPreview() {
	return (
		<>
			<div className="o3-type-body-base">
				<meta itemProp="@preview" />
				<OrderedList>
					<li>Lorem ipsum adipiscing elit.</li>
					<li>Sed feugiat turpis at massa tristique.</li>
					<li>Curabitu r accumsan elit luctus.</li>
				</OrderedList>
				<meta itemProp="@preview" />
			</div>
		</>
	);
}

export const filePath = 'src/components/typography/preview/List-Ordered.tsx';

export {ListPreview as preview};
