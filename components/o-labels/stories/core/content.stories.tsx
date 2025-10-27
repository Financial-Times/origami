import {ContentLabel as ContentLabelTsx} from '../../src/tsx/label';
import '../labels.scss';

const ComponentDescription = {
	title: 'Maintained/o-labels',
	component: ContentLabelTsx,
	argTypes: {
		state: {
			options: ['content-commercial', 'content-premium', 'content-scoop'],
			defaultValue: 'content-premium',
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

export const ContentLabel = args => {
	let copy = args.text;
	if (!copy) {
		switch (args.state) {
			case 'content-premium':
				copy = 'Premium';
				break;
			case 'content-commercial':
				copy = 'Paid Post';
				break;
			case 'content-scoop':
				copy = 'Exclusive';
				break;
			default:
				copy = args.state.replace('content-', '');
		}
	}
	if (args.size === 'default') {
		delete args.size;
	}
	return <ContentLabelTsx {...args}>{copy}</ContentLabelTsx>;
};
ContentLabel.args = {
	state: 'content-premium',
};
