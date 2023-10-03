import {Button, LinkButton} from "../src/tsx/button"
import "./button.scss"

export default {
	title: "Components/o-buttons",
	component: Button,
	args: {
		onClick: {
			table: {
				disable: true,
			},
		},
	},
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/MyHQ1qdwYyek5IBdhEEaND/FT-UI-Library?node-id=29%3A1131",
		},
		guidelines: {
			notion: "448d914df4fd4bb68fdf5bc5e85c4b46",
		},
		html: {},
	},
	argTypes: {
		icon: {
			control: "select",
			options: [
				"arrow-left",
				"arrow-right",
				"upload",
				"tick",
				"plus",
				"warning",
				"arrow-down",
				"arrow-up",
				"grid",
				"list",
				"edit",
				"download",
				"search",
				"refresh",
				"cross",
			],
		},
	},
}

const LinkButtonStory = args => <LinkButton {...args} />

export const PrimaryButton = {
	args: {
		label: "Press button",
		type: "primary",
	},
}

export const SecondaryButton = {
	args: {
		label: "Press button",
		type: "secondary",
	},
}

export const LinkAsButton = {
	render: LinkButtonStory,

	args: {
		label: "Link button",
		type: "secondary",
		href: "#",
	},
}

export const BigButton = {
	args: {
		size: "big",
		label: "Press button",
	},
}

export const InverseButton = {
	args: {
		label: "Press button",
		theme: "inverse",
	},

	parameters: {
		origamiBackground: "slate",
	},
}

export const MonoButton = {
	args: {
		label: "Press button",
		theme: "mono",
	},
}

export const GhostButton = {
	args: {
		label: "Press button",
		type: "ghost",
	},
}

export const ButtonWithIcon = {
	args: {
		label: "Upload",
		icon: "upload",
	},
}

export const IconOnlyButton = {
	args: {
		label: "Next",
		icon: "arrow-right",
		iconOnly: true,
	},
}
