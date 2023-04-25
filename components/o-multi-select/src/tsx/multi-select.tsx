type MultiSelectType = {
	label: string;
	selected: boolean;
}

export function MultiSelect({
	multiSelectOptions,
	id,
}: {
	multiSelectOptions: MultiSelectType[];
	id?: string;
}) {
	return (
		<span className="o-multi-select" data-o-component="o-multi-select">
			<select name={id} id={id} multiple>
				{multiSelectOptions.map(option => (
					<option key={option.label} value={option.label} selected={option.selected}>
						{option.label}
					</option>
				))}
			</select>
		</span>
	);
}
