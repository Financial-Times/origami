import {useEffect} from 'react';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {
	SyntaxHighlightBlock,
	SyntaxHighlight,
} from '../src/tsx/syntax-highlight';
import './syntax-highlight.scss';
import javascript from '../main';
import {langTemplates} from './fixtures.js';

export default {
	title: 'Components/o-syntax-highlight',
	component: SyntaxHighlightBlock,
	decorators: [withDesign, withHtml],
	parameters: {},
	args: {},
	argTypes: {
		language: {
			control: {
				type: 'select',
				labels: {
					html: 'HTML',
					js: 'Javascript',
					css: 'CSS',
					'': 'Inline Code',
					json: 'JSON',
					yaml: 'YAML',
					scss: 'SCSS',
					diff: 'Diff',
					bash: 'Bash',
				},
			},
			options: [
				'html',
				'js',
				'css',
				'',
				'json',
				'yaml',
				'scss',
				'diff',
				'bash',
			],
		},
	},
} as ComponentMeta<typeof SyntaxHighlightBlock>;

const SyntaxHighlightStory = args => {
	useEffect(() => {
		javascript.init();
	});
	return !args.language ? (
		<SyntaxHighlight>
			<div dangerouslySetInnerHTML={{__html: args.code}} />
		</SyntaxHighlight>
	) : (
		<SyntaxHighlight>
			<SyntaxHighlightBlock {...args} />
		</SyntaxHighlight>
	);
};
export const HTML: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
HTML.args = {
	language: 'html',
	code: langTemplates.html,
};

export const Javascript: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
Javascript.args = {
	language: 'js',
	code: langTemplates.js,
};

export const CSS: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
CSS.args = {
	language: 'css',
	code: langTemplates.css,
};

export const InlineCode: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
InlineCode.args = {
	language: '',
	code: langTemplates.inline,
};

export const JSON: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
JSON.args = {
	language: 'json',
	code: langTemplates.json,
};

export const YAML: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
YAML.args = {
	language: 'yaml',
	code: langTemplates.yaml,
};

export const SCSS: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
SCSS.args = {
	language: 'scss',
	code: langTemplates.scss,
};

export const Diff: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
Diff.args = {
	language: 'diff',
	code: langTemplates.diff,
};

export const Bash: ComponentStory<typeof SyntaxHighlightBlock> =
	SyntaxHighlightStory.bind({});
Bash.args = {
	language: 'bash',
	code: langTemplates.bash,
};
