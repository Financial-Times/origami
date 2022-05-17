import imageSet from '@financial-times/fticons/imageset.json';
import type {ComponentMeta, ComponentStory} from '@storybook/react';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {Icon} from '../src/tsx/icon';
import './icons.scss';

// HACK: copied from build-icon-list.js, need to make sure they don't go out of
//       sync
const imageDenyList = [
	'mute_notifications', // incorrect name, only include mute-notifications (with a dash)
];

export default {
	title: 'Components/o-icons',
	component: Icon,
	decorators: [withDesign, withHtml],
	argTypes: {
		icon: {
			control: 'select',
			options: imageSet.images
				.map(({name}) => name)
				.filter(image => !imageDenyList.includes(image)),
		},
	},
} as ComponentMeta<typeof Icon>;

export const Icons: ComponentStory<typeof Icon> = args => <Icon {...args} />;
Icons.args = {icon: 'arrow-down'};
