import React, {useState, useEffect} from "react"
import {addons, types} from "@storybook/addons"
import {useParameter} from "@storybook/api"
import {NotionRenderer} from "react-notion"
import "react-notion/dist/styles.css"
import {DocsWrapper, DocsContent} from "@storybook/components"

addons.register("origami/guidelines", () => {
	addons.add("origami/guidelines/tab", {
		title: "Guidelines",
		type: types.TAB,
		route: ({storyId}) => `/guidelines/${storyId}`,
		match: ({viewMode}) => viewMode == "guidelines",
		paramKey: "guidelines",
		render: ({active}) => {
			let {notion: notionPageId} = useParameter("guidelines", {notion: null})
			let [page, setPage] = useState(null)
			useEffect(() => {
				if (!notionPageId) return
				// TODO? make our own endpoint with notion-client
				fetch(`https://notion-api.splitbee.io/v1/page/${notionPageId}`)
					.then(r => r.json())
					.then(json => setPage(json))
			}, [notionPageId])
			if (!page || !active) return null

			return (
				<DocsWrapper>
					<DocsContent>
						<NotionRenderer blockMap={page} />
					</DocsContent>
				</DocsWrapper>
			)
		},
	})
})
