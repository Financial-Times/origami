import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {useEffect} from 'react';
import {OHeader} from '../src/tsx/header';
import javascript from '../main';
import './header.scss';


import { headerData, megaMenuData, subnavData } from './args';

export default {
	title: 'Components/o-header',
	component: OHeader,
	decorators: [withDesign, withHtml],
	args: {
	},
	parameters: {
		guidelines: {},
		html: {},
	},
} as ComponentMeta<typeof OHeader>

const Story: ComponentStory<typeof OHeader> = args => {
	useEffect(() => void javascript.init(), []);
	return <OHeader {...args} />;
};


export const HeaderPrimary: ComponentStory<typeof OHeader> = Story.bind({})
HeaderPrimary.storyName = 'Header'
HeaderPrimary.args = {...headerData, type: 'primary'}

export const MegaMenu: ComponentStory<typeof OHeader> = Story.bind({})
MegaMenu.args = {...megaMenuData, type: 'megamenu'}

export const HeaderWithSubnav: ComponentStory<typeof OHeader> = Story.bind({})
HeaderWithSubnav.args = {...subnavData, type: 'subnav'}

