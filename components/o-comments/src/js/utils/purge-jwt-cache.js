export default function purgeJwtCache() {
	const url = `https://comments-api.ft.com/user/auth`;
	return fetch(url, {
		method: 'PURGE',
		credentials: 'include'
	});
}
