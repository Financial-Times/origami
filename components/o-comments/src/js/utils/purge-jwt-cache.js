export default function purgeJwtCache(options = {}) {
	const commentsAPIUrl = options?.commentsAPIUrl || 'https://comments-api.ft.com';

	const url = `${commentsAPIUrl}/user/auth`;
	return fetch(url, {
		method: 'PURGE',
		credentials: 'include'
	});
}
