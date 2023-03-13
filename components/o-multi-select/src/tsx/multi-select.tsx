export function MultiSelect({
								multiSelectOptions, id
							}: {
	multiSelectOptions: string[];
	label: string;
	id?: string;
}) {

	return (
		<div className="o-multi-select o-multi-select--core" data-o-component="o-multi-select">
			<select name="multiple" id={id} multiple>
				{multiSelectOptions.map(option => <option value={option}>{option}</option>)}
			</select>
		</div>
	);
}
