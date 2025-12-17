import {FileUploadController} from "../src/tsx/FileUploadController";

export const FileInputJavaScript = () => {

	return (
		<div className="o3-form-field">
			<label
				className="o3-form-field__label"
				htmlFor="o3-form-file-input-_029271636737572715"
			>
				Driving license
			</label>
			<span
				className="o3-form-input__description"
				id="o3-form-description_7011586203746484"
			>
        			The front face of your driving license
      			</span>
			<div className="o3-form-file-input" id="file-input-container">
				<label
					htmlFor="file-input"
					className="o3-form-field-input__label"
					tabIndex="0"
				>
				<span
					className="o3-form-field-input__label__button o3-button o3-button--primary o3-button-icon o3-button-icon--upload">File Upload</span>
					<span data-testid="file-input-label" className="o3-form-field-input__label__text">No file chosen</span>
					<input
						data-testid="file-input"
						id="file-input"
						className="o3-form-file-input__input-field"
						required
						aria-required="true"
						type="file"
					/>
				</label>
			</div>
		</div>
	)
};

export const fileInputJavaScriptSetup = (canvasElement: HTMLCanvasElement) => {
	const fileUploadElement = canvasElement.querySelector(
		'#file-input'
	) as HTMLInputElement | null;

	if (fileUploadElement) {
		new FileUploadController(fileUploadElement)
	}
}
