const getJsonWebToken = () => fetch('https://comments-api.ft.com/user/auth/', {
	credentials: 'include'
}).then(response => {
	// user is not signed in or session token is invalid
	if (response.status === 404) {
		return { token: undefined, userIsSignedIn: false };
	}

	// user is signed in but has no display name
	if (response.status === 205) {
		return { token: undefined, userIsSignedIn: true };
	}

	// user is signed in and has a pseudonym
	if (response.ok) {
		return response.json();
	}

	throw new Error('Bad response from the authentication service');
});

export {
	getJsonWebToken
};
