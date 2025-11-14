import IMask from 'imask';

/**
 * @export
 */
export class DateInputMask {
	_input: HTMLInputElement;

	/**
	 * Class constructor.
	 *
	 * @param {HTMLElement} [element] - An input element in the DOM
	 */
	constructor(
		element: HTMLInputElement,
	) {
		this._input = element;

		IMask(this._input, {
			mask: 'd{/}m{/}Y',
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
					from: 0,
					to: 9999,
					maxLength: 4,
				},
			},
			format: date => {
				let day = date.getDate();
				let month = date.getMonth() + 1;
				const year = date.getFullYear();

				if (day < 10) day = '0' + day;
				if (month < 10) month = '0' + month;

				return [day, month, year].join('/');
			},
			parse: str => {
				const dayMonthYear = str.split('/');
				return new Date(dayMonthYear[0], dayMonthYear[1] - 1, dayMonthYear[2]);
			},
			lazy: false,
		});
	}
}
