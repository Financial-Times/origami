const tintGroup = token => {
	const tint = token.path[token.path.length - 1].split('-');
	token.origamiTint = {
		base: tint[0],
		value: tint[1],
	};
	return token;
};

export {tintGroup};
