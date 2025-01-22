import {UnorderedList} from '@financial-times/o3-foundation/esm';

function ListPreview() {
	return (
		<>
			<div className="o3-typography-use-case-body-base">
				<meta itemProp="@preview" />
				<UnorderedList>
					<li>Lorem ipsum adipiscing elit.</li>
					<li>Sed feugiat turpis at massa tristique.</li>
					<li>Curabitu r accumsan elit luctus.</li>
				</UnorderedList>
				<meta itemProp="@preview" />
			</div>
		</>
	);
}

export const filePath = 'src/components/typography/preview/List-Unordered.tsx';

export {ListPreview as preview};
