const compute = ({
	object = global,
	property = 'world'
}, ...numbers) => {
	let result = 0;
	for (const number of numbers) {
		result = result + number;
	}
	object[property] = result;
};

compute({}, 1, 1);
