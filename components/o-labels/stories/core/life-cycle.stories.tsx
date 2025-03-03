import {LifeCycleLabel as LifeCycleLabelTsx} from '../../src/tsx/label';
import '../labels.scss';

const ComponentDescription = {
	title: 'Maintained/o-labels',
	component: LifeCycleLabelTsx,
	argTypes: {
		state: {
			defaultValue: 'lifecycle-beta',
			table: {
				disable: true,
			},
		},
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

export const LifeCycleLabel = args => {
	const copy = args.text || args.state.replace('lifecycle-', '');
	if (args.size === 'default') {
		delete args.size;
	}
	return <LifeCycleLabelTsx {...args}>{copy}</LifeCycleLabelTsx>;
};
LifeCycleLabel.args = {
	text: 'Beta',
};
