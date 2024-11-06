import {ComponentStory, ComponentMeta} from '@storybook/react';
import {PrivateFoundation} from '../src/tsx/private-foundation';
import './private-foundation.scss';

export default {
	title: 'Components/o-private-foundation',
	component: PrivateFoundation,
	parameters: {},
	args: {},
} as ComponentMeta<typeof PrivateFoundation>;

const PrivateFoundationStory = args => <PrivateFoundation {...args} />;
export const DefaultPrivateFoundation: ComponentStory<typeof PrivateFoundation> = PrivateFoundationStory.bind(
	{}
);
