type MultiSelectType = {
	label: string;
	selected: boolean;
};

export function MultiSelect({
	multiSelectOptions,
	id,
	required
}: {
	multiSelectOptions: MultiSelectType[];
	id?: string;
	required?: boolean

}) {
	const selectedOptionsValues = multiSelectOptions
		.filter(option => option.selected)
		.map(option => option.label);

	return (
		<span className="o-multi-select" data-o-component="o-multi-select">
			<select name={id} id={id} multiple={true} value={selectedOptionsValues} required={required}>
				{multiSelectOptions.map(option => (
					<option key={option.label} value={option.label}>
						{option.label}
					</option>
				))}
			</select>
		</span>
	);
}
