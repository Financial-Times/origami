const throwError = (message) => {
	throw new Error(`*** o-syntax-highlight error:\n${message}\n***`);
};

module.exports = { throwError };
