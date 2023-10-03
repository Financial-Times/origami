import {useArgs} from "@storybook/client-api"
import type {Meta, StoryObj} from "@storybook/react"
import {ConceptButton} from "../src/tsx/concept-button"
import "./concept-button.scss"

const meta: Meta<typeof ConceptButton> = {
	component: ConceptButton,
	title: "Components/ft-concept-button",
	decorators: [
	],
	// @deprecated The concept pill is a candidate for deprecation.
	excludeStories: [
		'ConceptPill',
		'OpinionPill',
		'InversePill',
		'MonochromePill'
	],
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=0%3A915",
		},
		html: {},
	},
	args: {
		pressed: false,
	},
	argTypes: {
		extraButtonProps: {
			control: false,
			table: {disable: true},
		},
	},
}
export default meta
type Story = StoryObj<typeof ConceptButton>

const ButtonWithHooks = args => {
	const [_, updateArgs] = useArgs()
	return (
		<ConceptButton
			extraButtonProps={{
				onClick() {
					updateArgs({...args, pressed: !args.pressed})
				},
			}}
			{...args}
		/>
	)
}

export const ConceptPill: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Movies",
		theme: "standard",
	},
}

export const OpinionPill: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Movies",
		theme: "opinion",
	},
}

export const InversePill: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Movies",
		theme: "inverse",
	},
	parameters: {
		origamiBackground: "slate",
	},
}

export const MonochromePill: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Movies",
		theme: "monochrome",
	},
	parameters: {
		origamiBackground: "slate",
	},
}

export const SignupButton: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Sign up",
		pressed: false,
		theme: "standard",
		type: "follow",
	},
}

export const FollowButton: Story = {
	render: ButtonWithHooks,
	args: {
		label: "Movies",
		ariaLabel: "Follow movies on my FT",
		theme: "standard",
		type: "follow",
	},
}
