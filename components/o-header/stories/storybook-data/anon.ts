import {NavMenu} from '../../src/tsx/Props';

const data: NavMenu = {
	label: 'User',
	items: [
		{
			label: 'Help Centre',
			url: 'http://help.ft.com',
			submenu: null,
		},
		{
			label: 'Subscribe',
			url: '/products?segmentId=#',
			submenu: null,
		},
		{
			label: 'Sign In',
			url: '/login?location=#',
			submenu: null,
		},
	],
};

export default data;
