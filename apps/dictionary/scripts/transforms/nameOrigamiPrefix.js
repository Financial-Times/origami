
export function nameOrigamiPrivatePrefix(token) {
	let tokenName = token.name
	if (token.isSource) {
		tokenName = '_' + tokenName;
	}
	return tokenName;
}
