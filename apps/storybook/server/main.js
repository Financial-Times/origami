module.exports = {
	builder: "webpack5",
	framework: "@storybook/react",
	stories: [],
	refs: (config, {configType}) => {
		if (configType === "DEVELOPMENT") {
			return {
				Core: {
					title: "Core",
					url: "http://127.0.0.1:6969/",
					expanded: false,
				},
				Internal: {
					title: "Internal",
					url: "http://127.0.0.1:6970/",
					expanded: false,
				},
			}
		}
		return {
			Core: {
				title: "Core",
				url: "https://origami.ft.com/storybook/core",
				expanded: false,
			},
			Internal: {
				title: "Internal",
				url: "https://origami.ft.com/storybook/internal",
				expanded: false,
			},
		}
	},
}

// module.exports.refs = (config, {configType}) => {
// 	if (configType === "DEVELOPMENT") {
// 		return {
// 			Core: {
// 				title: "Core",
// 				url: "http://127.0.0.1:6969/",
// 				expanded: false,
// 			},
// 			Internal: {
// 				title: "Internal",
// 				url: "http://127.0.0.1:6970/",
// 				expanded: false,
// 			},
// 		}
// 	}
// 	return {
// 		Core: {
// 			title: "Core",
// 			url: "https://origami.ft.com/storybook/core",
// 			expanded: false,
// 		},
// 		Internal: {
// 			title: "Internal",
// 			url: "https://origami.ft.com/storybook/internal",
// 			expanded: false,
// 		},
// 	}
// }
