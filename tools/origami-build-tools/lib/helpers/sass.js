'use strict';

const windows64bit = process.platform === 'win32' && process.arch === 'x64';
const windows32bit = process.platform === 'win32' && process.arch === 'ia32';
const mac = process.platform === 'darwin';
const linux64bit = process.platform === 'linux' && process.arch === 'x64';
const linux32bit = process.platform === 'linux' && process.arch === 'ia32';

if (windows64bit) {
	module.exports = '../../exe/sass/windows-x64/src/sass.bat';
} else if (windows32bit) {
	module.exports = '../../exe/sass/windows-ia32/src/sass.bat';
} else if (mac) {
	module.exports = '../../exe/sass/macos-x64/src/sass';
} else if (linux64bit) {
	module.exports = '../../exe/sass/linux-x64/src/sass';
} else if (linux32bit) {
	module.exports = '../../exe/sass/linux-ia32/src/sass';
} else {
	throw new Error(
		'origami-build-tools/exe/sass does not have a precompiled binary for the platform/architecture you are using. Please contact Origami or open an issue on https://github.com/Financial-Times/sass/issues'
	);
}
