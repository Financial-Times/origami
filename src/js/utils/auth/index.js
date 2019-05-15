const getJsonWebToken = () => fetch('https://comments-auth.ft.com/v1/jwt/', {
	credentials: 'include'
}).then(response => {
	if (response.status === 404 || response.status === 205) {
		return { token: undefined };
	}

	if (response.ok) {
		return response.json();
	}

	throw new Error('Bad response from the authentication service');
}).then(json => {
	return json.token;
});

export {
	getJsonWebToken
};
