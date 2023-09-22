import type {Meta} from '@storybook/react';


export const TemplateSBConfig: Meta = {
	argTypes: {
		theme: {
			control: {
				type: 'radio',
				labels: {
					inverse: 'Inverse',
					mono: 'Mono',
					standard: 'Standard',
				},
			},
			options: ['inverse', 'mono', 'standard'],
		},
		size: {
			control: {
				type: 'radio',
				labels: {
					big: 'Big',
					standard: 'Standard',
				},
			},
			options: ['big', 'standard'],
		},
		icon: {
			control: {
				type: 'select',
				labels: {
					'arrow-left': 'Arrow left',
					'arrow-right': 'Arrow right',
					upload: 'Upload',
					tick: 'Tick',
					plus: 'Plus',
					warning: 'Warning',
					'arrow-down': 'Arrow down',
					'arrow-up': 'Arrow up',
					grid: 'Grid',
					list: 'List',
					edit: 'Edit',
					download: 'Download',
					search: 'Search',
					refresh: 'Refresh',
					cross: 'Cross',
				},
			},
			options: [
				'arrow-left',
				'arrow-right',
				'upload',
				'tick',
				'plus',
				'warning',
				'arrow-down',
				'arrow-up',
				'grid',
				'list',
				'edit',
				'download',
				'search',
				'refresh',
				'cross',
			],
		},
	},
	parameters: {
		controls: {exclude: ['attributes', 'onClick']},
	},
};
