/**
 * Authentication utilities for o-comments
 * Provides methods to handle user authentication with the comments API
 */
export default {
	/**
	 * Fetches a JSON Web Token for the current user from the comments API
	 *
	 * @param {Object} options - Configuration options
	 * @param {string} [options.commentsAPIUrl] - URL of the comments API (defaults to https://comments-api.ft.com)
	 * @param {string} [options.commentsAuthUrl] - Custom URL for authentication
	 * @param {boolean} [options.onlySubscribers] - Whether to limit comments to subscribers only
	 * @param {string} [options.displayName] - Display name to use for the user
	 * @param {boolean} [options.useStagingEnvironment] - Whether to use the staging environment
	 * @returns {Promise<Object>} Promise resolving to auth response with token and user status
	 */
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

		// Make authenticated request to the comments API
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

				// user is not signed in or session token is invalid
				// or error in comments api
				return { userHasValidSession: false, isSubscribed: false, isTrialist: false};
			}
		});
	}
};
