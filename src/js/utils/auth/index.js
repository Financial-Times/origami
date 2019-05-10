const getJsonWebToken = () => fetch('https://comments-auth.ft.com/v1/jwt/', {
	credentials: 'include'
}).then(response => {
	if (response.ok) {
		return response.json();
	}

	if (response.status === 404) {
		return { token: undefined };
	}

	throw new Error('Bad response from the authentication service');
}).then(json => {
	return json.token;
});

export {
	getJsonWebToken
};
