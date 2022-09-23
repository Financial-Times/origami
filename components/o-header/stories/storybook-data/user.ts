import {TNavMenu} from '../../src/tsx/Props';
const data: TNavMenu = {
	label: 'User',
	items: [
		{label: 'Help Centre', url: 'https://help.ft.com', submenu: null},
		{
			label: 'Settings & Account',
			url: 'https://www.ft.com/myaccount',
			submenu: null,
		},
		{label: 'Contact Preferences', url: '/myft/alerts', submenu: null},
		{label: 'Sign Out', url: '/logout', submenu: null},
	],
};

export default data;
