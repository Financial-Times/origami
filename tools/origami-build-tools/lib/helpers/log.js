'use strict';

const colors = require('colors/safe');

const noOp = () => {}; // eslint-disable-line no-empty-function

const loggingEnabled = process.env.OBT_LOG_LEVEL !== 'none';
const debugLoggingEnabled = process.env.OBT_LOG_LEVEL === 'debug';
const console = require('console');

const primary = (text) => {
	console.log(colors.bold(text));
};

const primaryError = (text) => {
	console.log(colors.bold.red(text));
};

const secondary = (text) => {
	console.log(colors.grey(text));
};

const secondaryError = (text) => {
	console.log(colors.red(text));
};

const debug = (text) => {
	console.log(colors.grey(text));
};

module.exports = {
	primary: loggingEnabled ? primary : noOp,
	primaryError: loggingEnabled ? primaryError : noOp,
	secondary: loggingEnabled ? secondary : noOp,
	secondaryError: loggingEnabled ? secondaryError : noOp,
	debug: debugLoggingEnabled ? debug : noOp
};
