function nameOrigamiPrefix(token) {
	token.path.unshift('o');
	return token.path.join('-');
}

module.exports = { nameOrigamiPrefix }
