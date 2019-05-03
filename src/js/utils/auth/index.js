const getJsonWebToken = () => fetch('https://comments-auth.ft.com/v1/jwt/', {
	credentials: 'include'
}).then(response => {
	if(response.ok) {
		return response.json();
	}
	throw new Error('Bad response from the authentication service');
}).then(json => {
	if (json.token) {
		return json.token;
	}
	throw new Error('Authentication token doesn\'t exist');
});

export {
	getJsonWebToken
};
