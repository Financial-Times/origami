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
	return states;
};

function findStoriesToInclude() {
	const brand = process.env.ORIGAMI_STORYBOOK_BRAND;
	if (brand === 'core') {
		return ['ContentLabel', 'LifecycleLabel'];
	} else if (brand === 'internal') {
		return ['SupportLabel', 'ServiceTierLabel', 'ColorPalletLabel'];
	} else {
		return ['Label'];
	}
}

export default {
	title: 'Components/o-labels',
	component: OLabel,
	decorators: [withDesign, withHtml],
	includeStories: findStoriesToInclude(),
	argTypes: {
		size: {
			control: {type: 'radio', labels: {undefined: 'default'}},
			options: ['small', 'big', undefined],
		},
		state: {
			table: {
				disable: true,
			},
		},
		text: {
			control: {type: 'text'},
			defaultValue: 'Example Label',
		},
	},
} as ComponentMeta<typeof OLabel>;

export const ContentLabel = args => {
	return stateOptions()
		.filter(state => state.startsWith('content'))
		.map(state => {
			return <OLabel {...args} state={state} />;
		});
};

export const LifecycleLabel = args => {
	return stateOptions()
		.filter(state => state.startsWith('lifecycle'))
		.map(state => {
			return <OLabel {...args} state={state} />;
		});
};

LifecycleLabel.args = {
	text: 'Beta',
};

export const SupportLabel = args => {
	return stateOptions()
		.filter(state => state.startsWith('support'))
		.map(state => {
			return <OLabel {...args} state={state} />;
		});
};

export const ServiceTierLabel = args => {
	return stateOptions()
		.filter(state => state.startsWith('tier'))
		.map(state => {
			return <OLabel {...args} state={state} />;
		});
};

export const ColorPalletLabel = args => {
	const colors = [
		'oxford',
		'teal',
		'lemon',
		'slate',
		'jade',
		'crimson',
		'mandarin',
	];
	return colors.map(state => {
		return <OLabel {...args} state={state} />;
	});
};

export const Label = args => {
	return <OLabel {...args} />;
};
