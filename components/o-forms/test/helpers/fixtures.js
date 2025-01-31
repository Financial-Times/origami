const validForm = `
<form action="" data-o-component="o-forms">

	<span class="o-forms-field o-forms-field--optional">
		<span class="o-forms-title">
			<label for="optional" class="o-forms-title__main">Optional text input</label>
		</span>

		<span class="o-forms-input o-forms-input--text">
			<input id="optional" type="text" name="optional" value="">
		</span>
	</span>

	<input id="hidden-demo" name="hidden-demo" type="hidden" value="123">

	<input class="demo-submit-button" type="submit">
</form>
`;

const invalidForm = `
<form action="" data-o-component="o-forms">

	<div class="o-forms-field" role="group" aria-labelledby="date-group-title">
		<span class="o-forms-title" aria-hidden="true">
			<span class="o-forms-title__main" id="date-group-title">Date input</span>
		</span>

		<span class="o-forms-input o-forms-input--date">
			<label for="date">
				<span class="o-forms-input__label">DD</span>
				<input class="o-forms-input__day-part" id="date" type="text" name="date" value="" required pattern="(0[1-9]|1[0-9]|2[0-9]|3[01])">
			</label>
			<label for="date1">
				<span class="o-forms-input__label">MM</span>
				<input class="o-forms-input__month-part" id="date1" type="text" name="date" value="" required pattern="(0[1-9]|1[012])">
			</label>
			<label for="date2">
				<span class="o-forms-input__label">YYYY</span>
				<input class="o-forms-input__year-part" id="date2" type="text" name="date" value="" required pattern="[0-9]{4}">
			</label>
		</span>
	</div>

	<label class="o-forms-field" for="text">
		<span class="o-forms-title">
			<span class="o-forms-title__main">Required text input</span>
		</span>

		<span class="o-forms-input o-forms-input--text">
			<input id="text" type="text" name="required" value="" required>
		</span>
	</label>

	<span class="o-forms-field o-forms-field--optional">
		<span class="o-forms-title">
			<label for="optional" class="o-forms-title__main">Optional text input</label>
		</span>

		<span class="o-forms-input o-forms-input--text">
			<input id="optional" type="text" name="optional" value="">
		</span>
	</span>

	<div class="o-forms-field" role="group" aria-labelledby="radio-group-title">
		<span class="o-forms-title" aria-hidden="true">
			<span class="o-forms-title__main" id="radio-group-title">Radio box input</span>
		</span>

		<span class="o-forms-input o-forms-input--radio-box">
			<span class="o-forms-input--radio-box__container">
				<label for="radio-yes">
					<input id="radio-yes" type="radio" name="radioBox">
					<span class="o-forms-input__label">Yes</span>
				</label>
				<label for="radio-no">
					<input id="radio-no" type="radio" name="radioBox" checked>
					<span class="o-forms-input__label o-forms-input__label--negative">No</span>
				</label>
			</span>
		</span>
	</div>

	<input id="hidden-demo" name="hidden-demo" type="hidden" value="123">

	<input class="demo-submit-button" type="submit">
</form>
`;

export {validForm, invalidForm};

export default invalidForm;
