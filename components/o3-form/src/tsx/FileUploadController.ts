export class FileUploadController {
	constructor(fileInput: HTMLInputElement) {
		fileInput.addEventListener('change', this._updateStatus);
		fileInput.addEventListener('o3Form.uploading.start', this._displayUpload);
		fileInput.addEventListener('o3Form.uploading.complete', this._removeUpload);
		fileInput.addEventListener('o3Form.reset', this._reset);

		const labelElement = fileInput.closest('.o3-form-file-input__label') as HTMLLabelElement | null;
		if (!labelElement) return;

		labelElement.addEventListener('click', () => fileInput.click());

		labelElement.addEventListener('keydown', (event: KeyboardEvent): void => {
			if (event.key === ' ' || event.key === 'Enter') {
				event.preventDefault();
				fileInput.click();
			}
		});

	}

	private _updateStatus: EventListener = (event: Event): void => {
		const target = event.target as HTMLInputElement | null;
		if (!target) return;

		const formField = target?.closest('.o3-form-field');
		if (!formField) return;

		const inputFileContainer = formField.querySelector('.o3-form-file-input');
		if (!inputFileContainer) return;

		const labelText = inputFileContainer.querySelector('.o3-form-file-input__label__text');
		if (!labelText) return;

		if (target && target.files && target.files.length > 0 && !formField.querySelector('.o3-form-field-input__destroy')) {
			inputFileContainer.appendChild(FileUploadController.createDestroyElement(target));
			labelText.classList.add('o3-form-field-input__label__text--file-selected');
		} else {
			labelText.classList.remove('o3-form-field-input__label__text--file-selected');
			inputFileContainer.querySelector('.o3-form-field-input__destroy')?.remove();
		}

		labelText.textContent = target.files?.[0].name || 'No file chosen';
	}

	private _reset: EventListener = (event: Event): void => {
		const target = event.target as HTMLInputElement | null;
		if (!target) return;

		target.value = '';
		target?.dispatchEvent(new Event('change'));
	}

	private _displayUpload: EventListener = (event: Event): void => {
		const target = event.target as HTMLFormElement | null;
		if (!target) return;

		const formField = target.closest('.o3-form-field');

		if (target && formField && !formField.querySelector('.o3-form-file-input__uploading')) {
			formField.appendChild(FileUploadController.createUploadingElement());
		}
	}

	private _removeUpload: EventListener = (event: Event): void => {
		const target = event.target as HTMLFormElement | null;
		if (!target) return;

		const formField = target.closest('.o3-form-field');
		if (!formField) return;

		formField.querySelector('.o3-form-file-input__uploading')?.remove();
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
		destroyElement.setAttribute('aria-label', 'Delete file');

		destroyElement.addEventListener('click', () => {
			fileInput.dispatchEvent(new CustomEvent('o3Form.reset'));
		});

		return destroyElement;
	}
}
