
export function nameOrigamiPrivatePrefix(token) {
	let joinedToken = token.path.join('-')
	if (token.isSource) {
		joinedToken = '_' + joinedToken;
	}
	return joinedToken;
}
