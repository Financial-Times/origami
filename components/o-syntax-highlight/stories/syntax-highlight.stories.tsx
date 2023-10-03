import {useEffect} from "react"
import {StoryObj, StoryFn, Meta} from "@storybook/react"
import {
	SyntaxHighlightBlock,
	SyntaxHighlight,
} from "../src/tsx/syntax-highlight"
import "./syntax-highlight.scss"
import javascript from "../main"
import {langTemplates} from "./fixtures.js"

const LanguageMapping = {
	HTML: "html",
	Javascript: "js",
	CSS: "css",
	"Inline Code": "",
	JSON: "json",
	YAML: "yaml",
	SCSS: "scss",
	Diff: "diff",
	Bash: "bash",
}

export default {
	title: "Components/o-syntax-highlight",
	component: SyntaxHighlightBlock,
	parameters: {},
	args: {},
	argTypes: {
		language: {
			control: "select",
			options: Object.keys(LanguageMapping),
			mapping: LanguageMapping,
		},
	},
} as Meta<typeof SyntaxHighlightBlock>

const SyntaxHighlightStory = args => {
	useEffect(() => {
		javascript.init()
	})
	return !args.language ? (
		<SyntaxHighlight>
			<div dangerouslySetInnerHTML={{__html: args.code}} />
		</SyntaxHighlight>
	) : (
		<SyntaxHighlight>
			<SyntaxHighlightBlock {...args} />
		</SyntaxHighlight>
	)
}

export const HTML: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "html",
		code: langTemplates.html,
	},
}

export const Javascript: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "js",
		code: langTemplates.js,
	},
}

export const CSS: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "css",
		code: langTemplates.css,
	},
}

export const InlineCode: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "",
		code: langTemplates.inline,
	},
}

export const JSON: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "json",
		code: langTemplates.json,
	},
}

export const YAML: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "yaml",
		code: langTemplates.yaml,
	},
}

export const SCSS: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "scss",
		code: langTemplates.scss,
	},
}

export const Diff: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "diff",
		code: langTemplates.diff,
	},
}

export const Bash: StoryObj<typeof SyntaxHighlightBlock> = {
	render: SyntaxHighlightStory,

	args: {
		language: "bash",
		code: langTemplates.bash,
	},
}
