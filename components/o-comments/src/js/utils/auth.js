/**
 * A registered user who has set a display name.
 * 
 * @typedef {Object} RegisteredUserResponse
 * @property {string} displayName    - The user’s display name (should be an empty string).
 * @property {string} token          - The JWT will not be issued when using the auth-subsonly endpoint.
 * @property {true}   isRegistered   - Always true.
 */

/**
 * A trial user.
 * 
 * @typedef {Object} TrialUserResponse
 * @property {string} displayName    - The user’s display name (should be an empty string).
 * @property {string} token          - The JWT will not be issued when using the auth-subsonly endpoint.
 * @property {true}   isTrialist     - Always true.
 */

/**
 * A subscribed user (whether they’ve set a display name yet or not).
 * 
 * @typedef {Object} SubscribedUserResponse
 * @property {string} displayName    - The user’s display name (empty if not yet set).
 * @property {string} token          - The JWT issued by the comments API if a display name is set, otherwise empty.
 * @property {true}   isSubscribed   - Always true for this shape.
 */

/**
 * A 409-conflict response when:
 * 	- when onlySubscribers is false (using auth endpoint) and user is signed in but has no display name
 *	- in live Q&A when a user is signed in but has no display name
 *	- when user is using auth-subsonly endpoint but has an email address associated with an old account
 * 
 * @typedef {Object} ConflictResponse
 * @property {true}   userHasValidSession - Always true for this shape.
 * @property {string} [errorCode]         - API-provided error code indicating the conflict reason.
 */

/**
 * A response indicating the user is not signed in, the session/token is invalid, or there was an error.
 * 
 * @typedef {Object} UnauthenticatedResponse
 * @property {false}  userHasValidSession - Always false for this shape.
 * @property {false}  isSubscribed        - Always false.
 * @property {false}  isTrialist          - Always false.
 */

/**
 * Union of all possible successful-auths.
 * 
 * @typedef {RegisteredUserResponse|TrialUserResponse|SubscribedUserResponse} FetchJsonWebTokenOkResponse
 */

/**
 * Union of every outcome this function may resolve to.
 * 
 * @typedef {FetchJsonWebTokenOkResponse|ConflictResponse|UnauthenticatedResponse} FetchJsonWebTokenResponse
 */

/**
 * Fetch a JSON Web Token from the FT Comments API, handling various user states.
 *
 * @param {Object} [options={}]
 * @param {string} [options.commentsAPIUrl]        - Base URL for the comments API (default: 'https://comments-api.ft.com').
 * @param {string} [options.commentsAuthUrl]       - Full override URL for the auth endpoint.
 * @param {boolean} [options.onlySubscribers]      - If true, use the `/auth-subsonly/` path instead of `/auth/`.
 * @param {string} [options.displayName]           - A display name to set on first sign-in or rename.
 * @param {boolean} [options.useStagingEnvironment] - If true, appends `?staging=1` to hit the staging environment.
 * @returns {Promise<FetchJsonWebTokenResponse>}
 */
export default {
	fetchJsonWebToken(options = {}){
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
			return response.json().then((json) => {
			// user is signed in
			if (response.ok) {
				return json;
			} 
			if (response.status === 409) {
				return { 
					userHasValidSession: true,
					errorCode: json?.errorCode,
				};
			} else {
				throw new Error('Invalid response status');
			}
			}).catch(() =>{
				return {
					userHasValidSession: false,
					isSubscribed: false,
					isTrialist: false
				};
			});
		});
	}
};
