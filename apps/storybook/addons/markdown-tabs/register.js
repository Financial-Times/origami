import React, {useState, useEffect, createElement} from "react"
import {addons, types} from "@storybook/addons"
import {DocsWrapper, DocsContent} from "@storybook/components"
import marksy from "marksy"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import "./style.scss"
import syntaxStyle from "./syntax-style.js"

const compile = marksy({
	createElement,
	elements: {
		code: ({language, code}) => (
			<SyntaxHighlighter language={language} style={syntaxStyle}>
				{code}
			</SyntaxHighlighter>
		),
		a: ({href, title, target, children}) => (
			<a
				href={href}
				title={title}
				target={target}
				className="o-typography-link">
				{children}
			</a>
		),
	},
})

function makeMarkdownTab({api, title, filename}) {
	let tabName = filename.toLowerCase()
	addons.add(`origami/component-md/${tabName}`, {
		title,
		type: types.TAB,
		route: ({storyId}) => `/${tabName}/${storyId}`,
		match: ({viewMode}) => viewMode == tabName,
		paramKey: tabName,
		render: ({active}) => {
			let loading = "loading..."
			let [content, setContent] = useState(loading)
			let path = api.getCurrentParameter("fileName")
			useEffect(() => {
				if (!active || !path) {
					setContent(loading)
					return
				}

				let nameMatch = path.match(/\/components\/([^/]+)\//)
				if (!nameMatch) {
					setContent(loading)
					return
				}
				let string = require(`../../../../components/${nameMatch[1]}/${filename}.md`)
				setContent(compile(string).tree)
			}, [active, path])
			if (!active || !path) return null
			return (
				<DocsWrapper>
					<DocsContent>
						<main className="readme o-typography-wrapper">{content}</main>
					</DocsContent>
				</DocsWrapper>
			)
		},
	})
}

addons.register("origami/component-md", api => {
	makeMarkdownTab({api, title: "README", filename: "README"})
	makeMarkdownTab({api, title: "Migration guide", filename: "MIGRATION"})
	makeMarkdownTab({api, title: "Changelog", filename: "CHANGELOG"})
})
