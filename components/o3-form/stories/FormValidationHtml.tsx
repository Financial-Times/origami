export const FormValidationHtml = () => {
	return (
		<form id="demo-form" className='o3-form'>
			<div className="o3-form-field" data-testid="first-input">
				<label
					className="o3-form-field__label"
					htmlFor="o3-form-text-input-_9004070302523871"
				>
					First name
				</label>
				<span
					className="o3-form-input__description"
					id="o3-form-description_41273237907367455"
				>
          				The name you are referred to by
        			</span>
				<input
					id="o3-form-text-input-_9004070302523871"
					className="o3-form o3-form-text-input"
					required
					aria-required="true"
					type="text"
				/>
			</div>
			<div className="o3-form-field" data-testid="second-input">
				<label
					className="o3-form-field__label"
					htmlFor="o3-form-text-input-_3017971228893219"
				>
					Last name
				</label>
				<span
					className="o3-form-input__description"
					id="o3-form-description_9230638484727663"
				>
          				Your family name
        			</span>
				<input
					id="o3-form-text-input-_3017971228893219"
					className="o3-form o3-form-text-input"
					required
					aria-required="true"
					type="text"
				/>
			</div>
			<div className="o3-form-field" data-testid="third-input">
				<label
					className="o3-form-field__label"
					htmlFor="o3-form-text-input-_9285747170073946"
				>
					CVV code
				</label>
				<span
					className="o3-form-input__description"
					id="o3-form-description_03257263157199375"
				>
          				We're definitely not stealing your data
        			</span>
				<input
					id="o3-form-text-input-_9285747170073946"
					className="o3-form o3-form-text-input"
					required
					aria-required="true"
					type="text"
				/>
			</div>
			<button className="o3-button o3-button--primary" type="submit">Submit</button>
		</form>
	)
}
