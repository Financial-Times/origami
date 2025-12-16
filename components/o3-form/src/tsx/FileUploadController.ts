export class FileUploadController {
	constructor(fileInput: HTMLInputElement) {
		fileInput.addEventListener('change', this._updateStatus);
		fileInput.addEventListener('o3Form.uploading.start', this._displayUpload);
		fileInput.addEventListener('o3Form.uploading.complete', this._removeUpload);
		fileInput.addEventListener('o3Form.reset', this._reset);
	}

	private _updateStatus(event: InputEvent): void {
		const formField = event.target.closest('.o3-form-field');
		const inputFileContainer = formField.querySelector('.o3-form-file-input');

		const labelText = inputFileContainer.querySelector('.o3-form-field-input__label__text');

		if (event.target && event.target.files.length > 0 && !formField.querySelector('.o3-form-field-input__destroy')) {
			inputFileContainer.appendChild(FileUploadController.createDestroyElement(event.target));
		}

		labelText.textContent = event.target.files[0]?.name || 'No file chosen';
	}

	private _reset(event: InputEvent): void {
		event.target.value = '';
		event.target?.dispatchEvent(new Event('change'));
	}

	private _displayUpload = (event: InputEvent): void => {
		const formField = event.target.closest('.o3-form-field');

		if (event.target && event.target.files.length > 0 && !formField.querySelector('.o3-form-field-input__destroy')) {
			formField.appendChild(FileUploadController.createUploadingElement());
		}
	}

	private static createUploadingElement(): HTMLElement {
		const uploadingElement = document.createElement('span');

		uploadingElement.classList.add('o3-form-field-input__uploading');
		uploadingElement.innerText = 'Uploading';

		return uploadingElement;
	}

	private static createDestroyElement(fileInput: HTMLInputElement): HTMLElement {
		const destroyElement = document.createElement('button');

		destroyElement.classList.add('o3-form-field-input__destroy');
		destroyElement.onclick = () => {
			fileInput.dispatchEvent(new CustomEvent('o3Form.reset')); };

		return destroyElement;
	}
}
