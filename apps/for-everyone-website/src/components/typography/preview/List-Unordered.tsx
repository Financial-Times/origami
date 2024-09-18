import {UnorderedList, Body} from '@financial-times/o3-foundation/esm';

function ListPreview() {
	return (
		<>
			<Body>
				<meta itemProp="@preview" />
				<UnorderedList>
					<li>Lorem ipsum adipiscing elit.</li>
					<li>Sed feugiat turpis at massa tristique.</li>
					<li>Curabitu r accumsan elit luctus.</li>
				</UnorderedList>
				<meta itemProp="@preview" />
			</Body>
		</>
	);
}

export const filePath = 'src/components/typography/preview/List-Unordered.tsx';

export {ListPreview as preview};
