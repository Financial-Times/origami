import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {SupportStatus} from '../src/tsx/label';
import './labels.scss';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const ComponentDescription = {
	title: 'Components/o-labels',
	component: SupportStatus,
    includeStories: (brand === 'internal' ? /.*/ : []),
	argTypes: {
		state: {defaultValue: 'support-active'},
		size: {
			options: ['small', 'default', 'big'],
			defaultValue: 'default'
		},
		text: {
			name: 'text',
			type: { name: 'string', required: false },
			control: {
			  type: 'text'
			}
		  }
	},
	decorators: [withDesign, withHtml]
};

export default ComponentDescription;

export const SupportStatusLabel = args => {
	const copy = args.text || args.state.replace('support-', '');
	if(args.size === 'default') {
		delete args.size;
	}
	return <SupportStatus {...args}>{copy}</SupportStatus>;
}
