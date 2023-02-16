export function MultiSelect({
	multiSelectOptions,
}: {
	multiSelectOptions: string[];
}) {
	return (
		<div className="o-multi-select" data-o-component="o-multi-select" data-o-multi-select-options={multiSelectOptions}>
			<div className="o-form o-multi-select o-multi-select--core">
				<span className="o-forms-field">
					<span className="o-forms-title">
						<label className="o-forms-title__main" htmlFor="multiple">
							Multiple select box
						</label>
					</span>

					<span className="o-forms-input o-forms-input--select">
						<select name="multiple" id="multiple" multiple>
							{multiSelectOptions.map(option => {
								<option value={option}>{option}</option>;
							})}
						</select>
					</span>
				</span>
			</div>
			<div className="o-form o-multi-select o-multi-select--enhanced">
				<span className="o-forms-field">
					<span className="o-forms-title">
						<label className="o-forms-title__main" id="o-multi-select-label">
							Multiple select box
						</label>
					</span>
				</span>

				<ul
					className="o-multi-select__selected-options"
					id="o-multi-select-selected"></ul>
				<div className="o-multi-select__input-wrapper">
					<div
						className="o-multi-select__input"
						id="o-multi-select__input"
						role="combobox"
						aria-activedescendant=""
						aria-labelledby="o-multi-select-label o-multi-select-selected"
						aria-haspopup="listbox"
						aria-expanded="false"
						aria-owns="o-multi-select-listbox"
						tabIndex={0}>
						<span className="o-multi-select__input-text">
							{' '}
							Click to select options{' '}
						</span>
					</div>
				</div>
				<div
					className="o-multi-select__dropdown-menu"
					id="o-multi-select-listbox"
					role="listbox"
					aria-label="multi select options"
					aria-multiselectable="true"
					tabIndex={-1}></div>
			</div>
		</div>
	);
}
