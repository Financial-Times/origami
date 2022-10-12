import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {LifeCycleLabel as LifeCycleLabelTsx} from '../src/tsx/label';
import './labels.scss';

const brand = process.env.ORIGAMI_STORYBOOK_BRAND;
const ComponentDescription = {
	title: 'Components/o-labels',
	component: LifeCycleLabelTsx,
    includeStories: (brand === 'core' ? /.*/ : []),
	argTypes: {
		state: {
            defaultValue: 'lifecycle-beta',
            table: {
                disable: true
            }
        },
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

export const LifeCycleLabel = args => {
	const copy = args.text || args.state.replace('lifecycle-', '');
	if(args.size === 'default') {
		delete args.size;
	}
	return <LifeCycleLabelTsx {...args}>{copy}</LifeCycleLabelTsx>;
}
