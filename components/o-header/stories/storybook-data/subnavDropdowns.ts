export interface DropdownItem {
	label: string;
	url: string;
}

export interface SubnavItemWithDropdown {
	label: string;
	url: string;
	selected?: boolean;
	dropdown?: DropdownItem[];
}

const items: SubnavItemWithDropdown[] = [
	{
		label: 'MONETARY POLICY RADAR',
		url: '/',
		selected: true,
	},
	{
		label: 'Federal Reserve',
		url: '',
		dropdown: [
			{label: 'Coverage', url: '/banks/federal-reserve/coverage'},
			{label: 'Policy rate scenarios', url: '/banks/federal-reserve/policy-rate-scenarios'},
			{label: 'Doves and hawks', url: '/banks/federal-reserve/doves-and-hawks'},
			{label: 'Central bankers views', url: '/banks/federal-reserve/views'},
		],
	},
	{
		label: 'European Central Bank',
		url: '',
		dropdown: [
			{label: 'Coverage', url: '/banks/european-central-bank/coverage'},
			{label: 'Policy rate scenarios', url: '/banks/european-central-bank/policy-rate-scenarios'},
			{label: 'Doves and hawks', url: '/banks/european-central-bank/doves-and-hawks'},
			{label: 'Central bankers views', url: '/banks/european-central-bank/views'},
		],
	},
	{
		label: 'Bank of England',
		url: '',
		selected: false,
		dropdown: [
			{label: 'Coverage', url: '/banks/bank-of-england/coverage'},
			{label: 'Policy rate scenarios', url: '/banks/bank-of-england/policy-rate-scenarios'},
			{label: 'Doves and hawks', url: '/banks/bank-of-england/doves-and-hawks'},
			{label: 'Central bankers views', url: '/banks/bank-of-england/views'},
		],
	},
	{
		label: 'Global',
		url: '/global',
	},
];

export default items;
