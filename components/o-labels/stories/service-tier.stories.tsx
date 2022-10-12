import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ServiceTier} from '../src/tsx/label';
import './labels.scss';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const ComponentDescription = {
	title: 'Components/o-labels',
	component: ServiceTier,
    includeStories: (brand === 'internal' ? /.*/ : []),
	argTypes: {
		state: { defaultValue: 'tier-bronze' },
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

export const ServiceTierLabel = args => {
	const copy = args.text || args.state.replace('tier-', '');
	if(args.size === 'default') {
		delete args.size;
	}
	return <ServiceTier {...args}>{copy}</ServiceTier>;
}
