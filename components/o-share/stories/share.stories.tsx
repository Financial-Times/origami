import {ComponentStory, ComponentMeta} from '@storybook/react';
import {withDesign} from 'storybook-addon-designs';
import withHtml from 'origami-storybook-addon-html';

import {Share} from '../src/tsx/share';
import {useEffect} from 'react';
import javascript from '../main';
import './share.scss';

export default {
	title: 'Components/o-share',
	component: Share,
	decorators: [withDesign, withHtml],
	args: {
		title: 'US drags',
		socialNetworks: [
			'twitter',
			'facebook',
			'linkedin',
			'whatsapp',
			'pinterest',
		],
		url: 'http://on.ft.com/1mUdgA2',
		titleExtra: 'FT.com | Pharmaceuticals',
		summary: 'US drugs group vows to maintain big British presence',
		relatedTwitterAccounts: 'ftcompanies',
		small: false,
		inverse: false,
		vertical: false,
		accesible: false
	},
} as ComponentMeta<typeof Share>;

const Story: ComponentStory<typeof Share> = args => {
	useEffect(() => void javascript.init(), []);
	return <Share {...args} />;
};

export const Horizontal: ComponentStory<typeof Share> = Story.bind({});
export const Small: ComponentStory<typeof Share> = Story.bind({});
Small.args = {
	small: true,
};
export const Inverse: ComponentStory<typeof Share> = Story.bind({});

Inverse.args = {
	inverse: true,
};
Inverse.parameters = {
	origamiBackground: 'slate',
};
export const Vertical: ComponentStory<typeof Share> = Story.bind({});
Vertical.args = {
	vertical: true,
};
