import IMask, {MaskedDateOptions} from 'imask';
import {DateValue} from "imask/masked/date";

/**
 * @export
 */
export class DateInputMask {
	_input: HTMLInputElement;
	_options: MaskedDateOptions = {
		mask: Date,
		pattern: 'd{/}m{/}Y',
		blocks: {
			d: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 31,
				maxLength: 2,
			},
			m: {
				mask: IMask.MaskedRange,
				from: 1,
				to: 12,
				maxLength: 2,
			},
			Y: {
				mask: IMask.MaskedRange,
				from: 1000,
				to: 9999,
				maxLength: 4,
			},
		},
		format: (date: DateValue) => {
			if (!(date instanceof Date)) {
				return '';
			}

			let day = String(date.getDate()).padStart(2, '0');
			let month = String(date.getMonth() + 1).padStart(2, '0');
			const year = date.getFullYear();

			return [day, month, year].join('/');
		},
		parse: (str: string) => {
			const [d, m, y] = str.split('/');
			return new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d),);
		},
		lazy: false,
	}

	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [element] - An input element in the DOM
	 */
	constructor(
		element: HTMLInputElement,
	) {
		this._input = element;

		/*
		Intentional casting, our object is correct according to docs.
		IMask's typings are a little funny here.
		 */
		IMask(this._input, this._options as any);
	}
}
