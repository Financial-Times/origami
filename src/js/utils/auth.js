export function fetchJsonWebToken (options = {}) {
	const url = new URL('https://comments-api.ft.com/user/auth/');

	if (options.displayName) {
		url.searchParams.append('displayName', options.displayName);
	}

	if (options.useStagingEnvironment) {
		url.searchParams.append('staging', '1');
	}

	return fetch(url, { credentials: 'include' }).then(response => {
		// user is signed in and has a pseudonym
		if (response.ok) {
			return response.json();
		} else {
			// user is signed in but has no display name
			if (response.status === 409) {
				return { userHasValidSession: true };
			}

			// user is not signed in or session token is invalid
			// or error in comments api
			return { userHasValidSession: false };
		}
	});
}
