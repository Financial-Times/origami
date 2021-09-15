'use strict';

const { access } = require('fs/promises');
const { constants } = require('fs');

/**
 * Node.JS no longer has an fs.exists method.
 * Instead we use the fs.access method and check we can read the file.
 * fs.access will throw an error if the file does not exist.
 * @param {string} file file-system path to the file you are wanting to check exists or not
 * @returns {Promise.<boolean>} Whether the file exists
*/
module.exports = async function fileExists(file) {
	try {
		await access(file, constants.R_OK);
		return true;
	} catch (error) {
		return false;
	}
};
