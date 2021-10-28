import React, {useState, useEffect} from "react"
import {addons, types} from "@storybook/addons"
import {
	DocumentWrapper,
	Link,
	TabWrapper,
	TabsState,
	DocsWrapper,
	DocsContent,
} from "@storybook/components"
addons.register("origami/component-md", () => {
	addons.add("origami/component-md/readme", {
		title: "README",
		type: types.TAB,
		route: ({storyId}) => `/readme/${storyId}`,
		match: ({viewMode}) => viewMode == "readme",
		paramKey: "readme",
		render: ({active}) => {
			let [content, setContent] = useState("loading...")
			if (!content || !active) return null

			return (
				<DocsWrapper>
					<DocsContent>hello</DocsContent>
				</DocsWrapper>
			)
		},
	})
})
