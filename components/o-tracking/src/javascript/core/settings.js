
const settings = {config:{}};

/**
 * Very basic implementation of deep clone, and only supports simple POJO objects and
 * native arrays.
 *
 * @param  {*} value Any value
 * @returns {*}       Copy of value
 * @private
 */
function clone(value) {
	if (value === undefined) {
		return value;
	}
	switch (Object.prototype.toString.call(value)) {
		case '[object Object]':
			return JSON.parse(JSON.stringify(value));
		case '[object Array]':
			return [].slice.call(value);
		default:
			return value;
	}
}

/**
 * Saves a value. Stores a copy rather than a reference, to avoid mutations leaking.
 *
 * @param {string} key - The key to use to store the object
 * @param {*} value - The value
 * @returns {void}
 */
function setValue(key, value) {
	settings[key] = clone(value);
}

/**
 * Retrieves a value from the settings object. Returns a copy rather than reference, to
 * avoid mutations leaking.
 *
 * @param {string} key - The key to get
 * @returns {*} - The setting.
 */
function getValue(key) {
	return clone(settings[key]);
}

/**
 * Deletes a value
 *
 * @param  {string} key - The key to delete
 * @returns {void}
 */
function destroy(key) {
	delete settings[key];
}
const set = setValue;
const get = getValue;

export {
	set,
	get,
	destroy
};
