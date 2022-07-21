import {NavMenuItem} from '../../src/tsx/Props';

const item: NavMenuItem = {
	label: 'UK',
	url: '/world/uk',
	selected: true,
	submenu: null,
};

const siblings: NavMenuItem[] = [];

const children: NavMenuItem[] = [
	{
		label: 'UK Business & Economy',
		url: '/uk-business-economy',
		submenu: null,
	},
	{
		label: 'UK Politics & Policy',
		url: '/world/uk/politics',
		submenu: null,
	},
	{
		label: 'UK Companies',
		url: '/companies/uk',
		submenu: null,
	},
];

const ancestors: NavMenuItem[] = [
	{
		label: 'World',
		url: '/world',
	},
];

export default {item, siblings, children, ancestors};
