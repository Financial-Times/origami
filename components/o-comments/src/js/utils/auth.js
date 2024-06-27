export default {
	fetchJsonWebToken: function fetchJsonWebToken (options = {}) {

		const commentsAPIUrl = options?.commentsAPIUrl || 'https://comments-api.ft.com';
		let url = options?.commentsAuthUrl ? new URL(options.commentsAuthUrl) : new URL(`${commentsAPIUrl}/user/auth/`);
		//TODO: CI-1493 redirect subscriber only users to another version of auth while the flag is on
		url.pathname = options?.onlySubscribers ? url.pathname.replace(/\/auth\//,'/auth-subsonly/')  : url.pathname;

		if (options.displayName) {
			url.searchParams.append('displayName', options.displayName);
		}

		if (options.useStagingEnvironment) {
			url.searchParams.append('staging', '1');
		}

		return fetch(url, { credentials: 'include' }).then(response => {
		// user is signed in
			if (response.ok) {
				return response.json();
			} else {
			// TODO: CI-1493 to remove after subscriber only is not behind a flag
			// response for when onlySubscribers is false and user is signed in but has no display name
				if (response.status === 409) {
					return { userHasValidSession: true };
				}

				// user is not signed in or session token is invalid
				// or error in comments api
				return { userHasValidSession: false, isSubscribed: false, isTrialist: false};
			}
		});
	}
};
