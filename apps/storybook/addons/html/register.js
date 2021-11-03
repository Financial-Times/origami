import React, {useEffect, useState} from "react"
import {addons, types} from "@storybook/addons"
import {AddonPanel} from "@storybook/components"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import prettier from "prettier"
import prettierHtmlParser from "prettier/parser-html"
import {useChannel} from "@storybook/api"

import {HTML_EVENT} from "."

addons.register("origami/html", () => {
	addons.add("origami/html/panel", {
		title: "HTML",
		type: types.PANEL,
		render: ({active, key}) => {
			let channel = addons.getChannel()
			let [html, setHtml] = useState("")
			useEffect(() => {
				channel.on(HTML_EVENT, html => {
					setHtml(html)
				})
			}, [])
			useChannel({
				[HTML_EVENT]: html =>
					setHtml(
						prettier.format(html, {
							htmlWhitespaceSensitivity: "ignore",
							parser: "html",
							printWidth: 80,
							plugins: [prettierHtmlParser],
						})
					),
			})
			if (!active) return null
			return (
				<AddonPanel active={active} key={key}>
					<SyntaxHighlighter language="html">{html}</SyntaxHighlighter>
				</AddonPanel>
			)
		},
	})
})
