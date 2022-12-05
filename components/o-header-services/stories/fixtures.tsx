import {ListItem, NavItem, SecondaryNavProps} from '../src/tsx/navs';

export const DummyText = (
	<div className="dummy-text">
		<p>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
			molestie eget ex ut volutpat. Suspendisse et molestie mi. Suspendisse at
			magna posuere, euismod erat eget, aliquet lorem. Praesent at semper nulla.
			Fusce a lobortis nibh, sit amet lobortis elit. Nunc ornare vulputate
			dictum. Mauris at luctus est. Cras fermentum, ex in rhoncus semper, nunc
			nunc porttitor felis, a dictum neque orci a tellus. Morbi ipsum mauris,
			pellentesque sit amet velit vitae, posuere euismod nisi. Etiam velit orci,
			sagittis vel pharetra sed, molestie vel massa. Sed dui sapien, euismod
			eget ultrices et, lacinia ut mi. Vivamus{' '}
			<a href="#">porttitor bibendum mauris</a> vel tempor. Vivamus vehicula
			dictum ipsum, a porta ex fermentum in.
		</p>
		<p>
			Pellentesque accumsan consectetur arcu, rutrum cursus arcu pretium vitae.
			Nullam vitae massa felis. Donec convallis iaculis faucibus. Etiam non
			ullamcorper dui. Nullam sit amet ultricies erat, at luctus metus. Aliquam
			euismod sem ut vehicula sollicitudin. Sed vitae neque ligula. Pellentesque
			id diam quis libero hendrerit semper nec vitae lectus. Aenean quis
			accumsan nisl.
		</p>
	</div>
);
export const relatedContent: ListItem[] = [
	{
		label: 'XXXXX',
		url: '/xxxx',
	},
	{
		label: 'Sign in',
		url: '/login',
	},
];
export const primaryNavData: NavItem[] = [
	{
		label: 'Documentation',
		url: '/Documentation',
		current: true,
		dropDownItems: [
			{
				label: 'Principles',
				url: '/Principles',
			},
			{
				label: 'Components',
				url: '/Components',
			},
			{
				label: 'Services',
				url: '/Services',
			},

			{
				label: 'Tutorials',
				url: '/Tutorials',
				current: true,
			},
		],
	},
	{
		label: 'Specifications',
		url: '/Specifications',
		dropDownItems: [
			{
				label: 'Condensed Specification',
				url: '/Condensed-Specification',
			},
			{
				label: 'Formal Specification',
				url: '/Formal-specification',
			},
			{
				label: 'Components',
				url: '/Components',
			},
			{
				label: 'Services',
				url: '/Services',
			},
			{
				label: 'Manifest',
				url: '/Manifest',
			},
		],
	},
	{
		label: 'Registry',
		url: '/Registry',
	},
];

export const secondaryNavData: SecondaryNavProps = {
	ancestors: [
		{label: 'Documentation', url: '#'},
		{label: 'tutorials', url: '#'},
	],
	children: [
		{label: 'Build Service', url: '#'},
		{label: 'The manual build process', url: '#', current: true},
	],
};
