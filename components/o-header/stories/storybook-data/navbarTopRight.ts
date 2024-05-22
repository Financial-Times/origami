import {TNavMenu} from '../../src/tsx/Props';

const data: TNavMenu = {
	label: 'Navigation',
	items: [
		{
			label: 'My Account',
			url: '/myaccount',
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
