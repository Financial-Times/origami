import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {SyntaxHighlight} from '../src/tsx/syntax-highlight';
import './syntax-highlight.scss';

export default {
	title: 'Components/o-syntax-highlight',
	component: SyntaxHighlight,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
} as ComponentMeta<typeof SyntaxHighlight>;

const SyntaxHighlightStory = args => <SyntaxHighlight {...args} />;
export const DefaultSyntaxHighlight: ComponentStory<typeof SyntaxHighlight> = SyntaxHighlightStory.bind(
	{}
);
