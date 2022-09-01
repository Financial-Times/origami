import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {Example} from '../src/tsx/example';
import './example.scss';

export default {
	title: 'Components/o-example',
	component: Example,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof Example>;

const ExampleStory = args => <Example {...args} />;
export const DefaultExample: ComponentStory<typeof Example> = ExampleStory.bind(
	{}
);
