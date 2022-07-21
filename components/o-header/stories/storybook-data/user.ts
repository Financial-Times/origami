import {NavMenu} from '../../src/tsx/Props';
const data: NavMenu = {
	label: 'User',
	items: [
		{label: 'Help Centre', url: 'http://help.ft.com', submenu: null},
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
