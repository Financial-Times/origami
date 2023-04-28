function nameOrigamiPrefix(token) {
	token.path.unshift('o');
	return token.path.join('-');
}

function nameOrigamiPrivatePrefix(token) {
	token.path.unshift('_o');
	return token.path.join('-');
}

module.exports = { nameOrigamiPrefix, nameOrigamiPrivatePrefix }
