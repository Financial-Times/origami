import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {Header} from '../src/tsx/header';
import javascript from '../main';
import './header.scss';


export default {
	title: 'Components/o-header',
	component: Header,
	decorators: [withDesign, withHtml],
	args: {
	},
	parameters: {
		guidelines: {},
		html: {},
	},
} as ComponentMeta<typeof Header>

const Story: ComponentStory<typeof Header> = args => {
	useEffect(() => void javascript.init(), []);
	return <Header {...args} />;
};


export const HeaderPrimary = Story.bind({})
HeaderPrimary.storyName = 'Header'
HeaderPrimary.args = {}

