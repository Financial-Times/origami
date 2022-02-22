import {withDesign} from 'storybook-addon-designs';
import {FollowButton} from '../src/tsx/follow-button';
import {useEffect} from 'react';
import javascript from '../src/js/myft-concept-button';
import './follow-button.scss';
import withHtml from 'origami-storybook-addon-html';

export default {
	title: 'Components/myft-follow-button',
	component: FollowButton,
	decorators: [withDesign, withHtml],
	args: {
		extraFormProps: {
			onSubmit(event) {
				event.preventDefault();
			},
		},
	},
	parameters: {
		design: {
			type: 'figma',
			url: 'https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A915',
		},
		html: {},
		actions: {
			handles: ['submit'],
		},
	},
};

const Story = args => {
	useEffect(() => {
		javascript.init();
	}, []);
	return <FollowButton {...args} />;
};

export const Standard = Story.bind({});
Standard.args = {
	conceptName: 'Movies',
	theme: 'standard',
	followed: false,
};
