import {withOrigamiBackground} from "../withOrigamiBackground"

export const decorators = [withOrigamiBackground]

export const globalTypes = {
	origamiBackground: {
		name: "Origami Background",
		description: "Background colour to show components on.",
		toolbar: {
			icon: "photo",
			items: [
				{
					value: "",
					title: "recommended",
				},
				"paper",
				"white",
				"wheat",
				"slate",
			],
			showName: false,
		},
	},
}
