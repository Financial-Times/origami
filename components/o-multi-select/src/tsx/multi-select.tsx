export function MultiSelect({
	multiSelectOptions,
	id,
}: {
	multiSelectOptions: string[];
	id?: string;
}) {
	return (
		<div className="o-multi-select" data-o-component="o-multi-select">
			<select name={id} id={id} multiple>
				{multiSelectOptions.map(option => (
					<option key={option} value={option}>
						{option}
					</option>
				))}
			</select>
		</div>
	);
}
