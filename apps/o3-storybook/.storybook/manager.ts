import {addons} from '@storybook/manager-api';
import {themes} from '@storybook/theming';
import {defaultConfig} from 'storybook-addon-tag-badges';

addons.setConfig({
	theme: themes.light,
	tagBadges: [
		{
			tags: 'experimental',
			badge: {
				text: 'Experimental',
				style: {
					backgroundColor: '#c263d4',
					color: '#fcf0ff',
				},
				tooltip:
					'This component is experimental and is not recommended for production use',
			},
			display: {
				sidebar: [
					{
						type: 'component',
						skipInherited: true,
					},
				],
				toolbar: false,
				mdx: true,
			},
		},
		...defaultConfig,
	],
});
