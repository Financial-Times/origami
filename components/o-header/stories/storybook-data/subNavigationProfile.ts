import {NavMenuItem} from '../../src/tsx/Props';
const item: NavMenuItem = {
	label: 'Settings & Account',
	url: '/myaccount/personal-details',
	selected: true,
	submenu: null,
};

const siblings: NavMenuItem[] = [];

const children: NavMenuItem[] = [
	{
		label: 'Personal Details',
		url: '/myaccount/personal-details',
		submenu: null,
	},
	{
		label: 'Licence',
		url: '/myaccount/licence',
		submenu: null,
	},
];

const ancestors: NavMenuItem[] = [];

export default {item, siblings, children, ancestors};
