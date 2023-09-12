
export function nameOrigamiPrivatePrefix(token) {
	let tokenName = token.name
	console.log(`🚀 ~ joinedToken:`, {token, tokenName});
	if (token.isSource) {
		tokenName = '_' + tokenName;
	}
	return tokenName;
}
