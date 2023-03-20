/**
 *
 * Debounces function so it is only called after n milliseconds
 * without it not being called
 *
 * @example
 * Utils.debounce(myFunction() {}, 100);
 *
 * @param {Function} func - Function to be debounced
 * @param {number} wait - Time in miliseconds
 *
 * @returns {Function} - Debounced function
 */
function debounce(func, wait) {
	let timeout;
	return function () {
		const args = arguments;
		const later = () => {
			timeout = null;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
}

/**
 *
 * Throttle function so it is only called once every n milliseconds
 *
 * @example
 * Utils.throttle(myFunction() {}, 100);
 *
 * @param {Function} func - Function to be throttled
 * @param {number} wait - Time in miliseconds
 *
 * @returns {Function} - Throttled function
 */
function throttle(func, wait) {
	let timeout;
	return function () {
		if (timeout) {
			return;
		}
		const args = arguments;
		const later = () => {
			timeout = null;
			func.apply(this, args);
		};

		timeout = setTimeout(later, wait);
	};
}

/**
 * Generates a unique ID string by concatenating the given component name, prefix, and a random number.
 *
 * @param {string} componentName - The name of the component to be included in the ID string.
 * @returns {function} A function that takes a prefix string and returns a unique ID string.
 *
 * @example
 *
 * const generateId = uidBuilder('myComponent');
 * const id = generateId('prefix');
 * console.log(id); // 'myComponent-prefix1234567890'
 */

const uidBuilder = (componentName) => prefix => {
	const uid = String(Math.random()).split('.')[1];
	return `${componentName}-${prefix}${uid}`;
};


export {
	debounce,
	throttle,
	uidBuilder
};
