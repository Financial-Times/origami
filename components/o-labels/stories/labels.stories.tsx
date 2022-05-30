import type {ComponentMeta, ComponentStory} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {Brand, BrandStates, Label as OLabel} from '../src/tsx/label';
import './labels.scss';

const stateOptions = (): BrandStates[keyof BrandStates][] => {
	let states = [];
	switch ((process.env.ORIGAMI_STORYBOOK_BRAND ?? 'core') as Brand) {
		case 'core':
			states = ['content-commercial', 'content-premium', 'lifecycle-beta'];
			break;
		case 'internal':
			states = [
				'support-active',
				'support-dead',
				'support-deprecated',
				'support-experimental',
				'support-maintained',
				'tier-bronze',
				'tier-gold',
				'tier-platinum',
				'tier-silver',
				'oxford',
				'teal',
				'lemon',
				'slate',
				'jade',
				'crimson',
				'mandarin',
			];
			break;
		case 'whitelabel':
		default:
			break;
	}
	return states.concat(undefined);
};

export default {
	title: 'Components/o-labels',
	component: OLabel,
	decorators: [withDesign, withHtml],
	argTypes: {
		size: {
			control: {type: 'radio', labels: {undefined: 'default'}},
			options: ['small', 'big', undefined],
		},
		state: {
			control: {type: 'select', labels: {undefined: 'default'}},
			options: stateOptions(),
		},
	},
} as ComponentMeta<typeof OLabel>;

export const Label: ComponentStory<typeof OLabel> = args => (
	<OLabel {...args} />
);
Label.args = {
	text: 'Label',
};
