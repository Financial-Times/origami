import {TNavMenu} from '../../src/tsx/Props';

const data: TNavMenu = {
	label: 'Navigation',
	items: [
		{
			label: 'Sign In',
			url: '/login?location=#',
			submenu: null,
		},
		{
			label: 'Subscribe',
			url: '/products?segmentId=#',
			submenu: null,
		},
	],
};

export default data;
