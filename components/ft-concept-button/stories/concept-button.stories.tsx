import {withDesign} from 'storybook-addon-designs';
import {ConceptButton} from '../src/tsx/concept-button';
import {useArgs} from '@storybook/client-api';
import './concept-button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/ft-concept-button',
	component: ConceptButton,
	decorators: [withDesign, withHtml],
	// @todo Deprecate concept pill button?
	// It looks like the concept pill has only ever
	// been intended as a link to concepts.
	excludeStories: [
		'ConceptPill',
		'OpinionPill',
		'InversePill',
		'MonochromePill'
	],
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A915',
		},
		html: {},
	},
	args: {
		pressed: false,
	},
	argTypes: {
		extraButtonProps: {
			control: false,
			table: {disable: true},
		},
	},
};

const Pill = args => {
	const [_, updateArgs] = useArgs();
	return (
		<ConceptButton
			extraButtonProps={{
				onClick() {
					updateArgs({...args, pressed: !args.pressed});
				},
			}}
			{...args}
		/>
	);
};

export const ConceptPill = Pill.bind({});

ConceptPill.args = {
	label: 'Movies',
	theme: 'standard',
};

export const OpinionPill = Pill.bind({});

OpinionPill.args = {
	label: 'Movies',
	theme: 'opinion',
};

export const InversePill = Pill.bind({});

InversePill.args = {
	label: 'Movies',
	theme: 'inverse',
};

InversePill.parameters = {
	origamiBackground: 'slate',
};

export const MonochromePill = Pill.bind({});

MonochromePill.args = {
	label: 'Movies',
	theme: 'monochrome',
};

MonochromePill.parameters = {
	origamiBackground: 'slate',
};

export const SignupButton = args => {
	const [_, updateArgs] = useArgs();
	return (
		<ConceptButton
			extraButtonProps={{
				onClick() {
					const pressed = !args.pressed;
					updateArgs({
						...args,
						pressed,
						label: pressed ? 'Signed up' : 'Sign up',
					});
				},
			}}
			{...args}
		/>
	);
};

SignupButton.args = {
	label: 'Sign up',
	pressed: false,
	theme: 'standard',
	type: 'follow',
};

export const FollowButton = args => {
	const [_, updateArgs] = useArgs();
	return (
		<ConceptButton
			extraButtonProps={{
				onClick() {
					const pressed = !args.pressed;
					updateArgs({
						...args,
						pressed,
						ariaLiveText: pressed
							? 'Now following Movies on my FT'
							: 'No longer following movies on my FT',
						ariaLabel: pressed
							? 'Unfollow movies on my FT'
							: 'Follow movies on my FT',
					});
				},
			}}
			{...args}
		/>
	);
};

FollowButton.args = {
	label: 'Movies',
	ariaLabel: 'Follow movies on my FT',
	theme: 'standard',
	type: 'follow',
};
