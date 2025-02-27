import {BaseLabel as BaseLabelTsx} from '../src/tsx/label';
import './labels.scss';

export default {
	title: 'Maintained/o-labels',
	component: BaseLabelTsx,
	argTypes: {
		size: {
			options: ['small', 'default', 'big'],
			defaultValue: 'default',
		},
		text: {
			name: 'text',
			type: {name: 'string', required: true},
			defaultValue: 'example label',
			control: {
				type: 'text',
			},
		},
	},
};

export const BaseLabel = args => {
	const copy = args.text;
	if (args.size === 'default') {
		delete args.size;
	}
	return <BaseLabelTsx {...args}>{copy}</BaseLabelTsx>;
};
