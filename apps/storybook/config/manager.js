import {addons} from "@storybook/addons"
import {create} from "@storybook/theming"
import "./theme.css"

addons.setConfig({
	previewTabs: {
		"origami/guidelines/tab": {
			hidden: false,
			index: Infinity,
		},
	},
	theme: create({
		base: "light",
		brandTitle: "Origami",
		brandUrl: "https://origami.ft.com",
		colorPrimary: "#0F5499",
		colorSecondary: "#0D7680",

		// UI
		appBg: "white",
		appContentBg: "white",
		appBorderColor: "#DEDFE0",
		appBorderRadius: 20,

		// Typography
		fontBase: "system-ui, sans-serif",
		fontCode: "IBM Plex Mono, monospace",

		// Text colors
		textColor: "black",
		textInverseColor: "white",

		// Toolbar default and active colors
		barTextColor: "#262A33",
		barSelectedColor: "black",
		barBg: "#f4f4f5",

		// Form colors
		inputBg: "white",
		inputBorder: "#F4F4F5",
		inputTextColor: "black",
		inputBorderRadius: 10,
	}),
})
