import {useEffect} from 'react';
import withHtml from 'origami-storybook-addon-html';
import {withDesign} from 'storybook-addon-designs';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {SyntaxHighlight} from '../src/tsx/syntax-highlight';
import './syntax-highlight.scss';
import javascript from '../main';
import {langTemplates} from './fixtures.js';

export default {
	title: 'Components/o-syntax-highlight',
	component: SyntaxHighlight,
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
} as ComponentMeta<typeof SyntaxHighlight>;

const SyntaxHighlightStory = args => {
	useEffect(() => {
		javascript.init();
	});
	console.log(args);
	return (
		<div className="demo" data-o-component="o-syntax-highlight">
			{/* if code is written inline language is set to empty string */}
			{!args.language ? (
				<>
					<p>
						This is some text, and it is here to illustrate that if you use a
						<code>&lt;code&gt;</code> tag, it will get treatment regardless of
						what language is inside it. But only if it is an inline
						<code>&lt;code&gt;</code> tag
					</p>
					<p>
						This is some text, and it is here to illustrate that if you use a
						<var>&lt;var&gt;</var> tag, it will get treatment regardless of what
						language is inside it. But only if it is an inline
						<var>&lt;var&gt;</var> tag
					</p>
					<pre tabIndex={0}>
						<code className="o-syntax-highlight--html">
							<SyntaxHighlight {...args} />
						</code>
					</pre>
				</>
			) : (
				<SyntaxHighlight {...args} />
			)}
		</div>
	);
};
export const HTML: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
HTML.args = {
	language: 'html',
	template: langTemplates.html,
};

export const Javascript: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
Javascript.args = {
	language: 'js',
	template: langTemplates.js,
};

export const CSS: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
CSS.args = {
	language: 'css',
	template: langTemplates.css,
};

export const InlineCode: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
InlineCode.args = {
	language: '',
	template: langTemplates.inline,
};

export const JSON: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
JSON.args = {
	language: 'json',
	template: langTemplates.json,
};

export const YAML: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
YAML.args = {
	language: 'yaml',
	template: langTemplates.yaml,
};

export const SCSS: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
SCSS.args = {
	language: 'scss',
	template: langTemplates.scss,
};

export const Diff: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
Diff.args = {
	language: 'diff',
	template: langTemplates.diff,
};

export const Bash: ComponentStory<typeof SyntaxHighlight> =
	SyntaxHighlightStory.bind({});
Bash.args = {
	language: 'bash',
	template: langTemplates.bash,
};
