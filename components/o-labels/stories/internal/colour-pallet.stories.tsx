import {ColourLabel} from '../../src/tsx/label';
import '../labels.scss';

const ComponentDescription = {
	title: 'Maintained/o-labels',
	component: ColourLabel,
	argTypes: {
		state: {defaultValue: 'oxford'},
		size: {
			options: ['small', 'default', 'big'],
			defaultValue: 'default',
		},
		text: {
			name: 'text',
			type: {name: 'string', required: false},
			control: {
				type: 'text',
			},
		},
	},
};

export default ComponentDescription;

export const ColourPalletLabel = args => {
	const copy = args.text || args.state;
	if (args.size === 'default') {
		delete args.size;
	}
	return <ColourLabel {...args}>{copy}</ColourLabel>;
};
