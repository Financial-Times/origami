export default {
	fetchJsonWebToken: function fetchJsonWebToken (options = {}) {

		const commentsAPIUrl = options?.commentsAPIUrl || 'https://comments-api.ft.com';
		const url = options?.commentsAuthUrl ? new URL(options.commentsAuthUrl) : new URL(`${commentsAPIUrl}/user/auth/`);
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
				// TODO: CI-1493 to remove after subscriber only is not behind a flag - check on Q&A usage, see below
				// response for when onlySubscribers is false and user is signed in but has no display name
				// also used in live Q&A when a user is signed in but has no display name
				if (response.status === 409) {
					return { userHasValidSession: true };
				}

				// some users have coral accounts associated to old FT accounts that are using the same email address
				// we need to remove this email before they can sign in to the new account
				if (response.status === 403) {
					return { emailInUse: true };
				}

				// user is not signed in or session token is invalid
				// or error in comments api
				return { userHasValidSession: false, isSubscribed: false, isTrialist: false};
			}
		});
	}
};
