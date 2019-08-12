const getJsonWebToken = () => fetch('https://comments-api.ft.com/user/auth/', {
	credentials: 'include'
}).then(response => {
	// user is signed in but has no display name
	if (response.status === 205) {
		return { token: undefined, userIsSignedIn: true };
	}

	// user is signed in and has a pseudonym
	if (response.ok) {
		return response.json();
	} else {
		// user is not signed in or session token is invalid
		// or error in comments api
		return { token: undefined, userIsSignedIn: false };
	}
});

export {
	getJsonWebToken
};
