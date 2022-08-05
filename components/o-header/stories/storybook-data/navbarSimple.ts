import {TNavMenu} from '../../src/tsx/Props';

const data: TNavMenu = {
	label: 'Navigation',
	items: [
		{
			label: 'Home',
			url: '/',
			submenu: null,
		},
		{
			label: 'fastFT',
			url: '/fastft',
			submenu: null,
		},
		{
			label: 'Markets Data',
			url: 'https://markets.ft.com/data',
			submenu: null,
		},
	],
};

export default data;
