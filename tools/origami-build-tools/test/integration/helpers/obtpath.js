'use strict';

const { readFile } = require('fs/promises');
const path = require('path');


module.exports = function obtBin() {
	return readFile(path.join(__dirname, '../../../package.json'))
		.then(obtPackageJson => {
			const obtPackage = JSON.parse(obtPackageJson);
			return path.join(__dirname, '../../../', obtPackage.bin.obt);
		});
};
