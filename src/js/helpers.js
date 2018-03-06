const throwError = (message) => {
	throw new Error(`*** o-message error: ${message} ***`);
};

module.exports = { throwError };
