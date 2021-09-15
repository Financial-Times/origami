const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export default (assert, count = 5) => {
	return new Promise((resolve, reject) => {
		const test = () => {
			try {
				assert();
				resolve();
			} catch (error) {
				if (count) {
					count = count - 1;
					wait().then(test);
				} else {
					reject(error);
				}
			}
		};

		test();
	});
};
