export const keys = {
	up: '\x1B\x5B\x41',
	down: '\x1B\x5B\x42',
	enter: '\x0D',
	space: '\x20',
};
// helper function for timing
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
