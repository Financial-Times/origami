
export function nameOrigamiPrivatePrefix(token) {
	if (token.isSource) {
		token.path.unshift('_o');
	} else {
		token.path.unshift('o');
	}
	return token.path.join('-');
}
