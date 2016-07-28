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
	return function() {
		const args = arguments;
		const later = () => {
			timeout = null;
			func.apply(this, args);
		};
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
	};
};

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
	return function() {
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
};

export {
	debounce,
	throttle
};
