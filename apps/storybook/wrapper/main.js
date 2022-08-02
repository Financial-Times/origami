module.exports.core = {
	builder: "webpack5",
}

module.exports.stories = ["./*.stories.tsx"]

module.exports.addons = [
	"@storybook/addon-essentials",
	"@storybook/addon-a11y",
	"@storybook/addon-links",
	"origami-storybook-addon-html/register",
]

module.exports.refs = (config, {configType}) => {
	if (configType === "DEVELOPMENT") {
		return {
			Core: {
				title: "Core",
				url: "http://127.0.0.1:6969/",
			},
			Internal: {
				title: "Internal",
				url: "http://127.0.0.1:6970/",
				expanded: false,
			},
		}
	}
	if (process.env.HEROKU_APP_NAME) {
		return {
			Core: {
				title: "Core",
				url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/brands/core/`,
			},
			Internal: {
				title: "Internal",
				url: `https://${process.env.HEROKU_APP_NAME}.herokuapp.com/brands/internal/`,
				expanded: false,
			},
		}
	}
	return {
		Core: {
			title: "Core",
			url: "https://origami.ft.com/brands/core/",
		},
		Internal: {
			title: "Internal",
			url: "https://origami.ft.com/brands/internal/",
			expanded: false,
		},
	}
}
