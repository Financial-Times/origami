export const parameters = {
	actions: {argTypesRegex: "^on[A-Z].*"},
	controls: {
		matchers: {
			color: /(background|color)$/i,
			date: /Date$/,
		},
	},
	backgrounds: {
		default: "page background",
		values: [
			{
				name: "page background",
				value: "var(--o-colors-page-background)",
			},
			...["slate", "candy", "white", "black", "velvet", "lemon"].map(name => {
				return {
					name,
					value: `var(--o-colors-${name})`,
				}
			}),
		],
	},
}
