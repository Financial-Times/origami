const getJsonWebToken = () => fetch('https://comments-api.ft.com/user/auth/', {
	credentials: 'include'
}).then(response => {
	if (response.status === 404) {
		return { token: undefined, userIsSignedIn: false };
	}

	if (response.status === 205) {
		return { token: undefined, userIsSignedIn: true };
	}

	if (response.ok) {
		return response.json();
	}

	throw new Error('Bad response from the authentication service');
});

export {
	getJsonWebToken
};
