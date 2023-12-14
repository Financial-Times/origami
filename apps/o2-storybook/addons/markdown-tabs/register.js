import React, {useState, useEffect, createElement} from "react"
import {renderToStaticMarkup} from "react-dom/server"
import {addons, types} from "@storybook/addons"
import {DocsWrapper, DocsContent} from "@storybook/components"
import marksy from "marksy"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import "./style.scss"
import syntaxStyle from "./syntax-style.js"
import slugger from "github-slugger"

function textContent(node) {
	if (["string", "number"].includes(typeof node)) {
		return String(node)
	}
	if (node instanceof Array) {
		return node.map(textContent).join("")
	}
	if (typeof node === "object" && node) {
		return textContent(node.props.children)
	}
}

const compile = marksy({
	createElement,
	elements: {
		h1: ({children}) => (
			<h1 id={slugger.slug(textContent(children))}>{children}</h1>
		),
		h2: ({children}) => (
			<h2 id={slugger.slug(textContent(children))}>{children}</h2>
		),
		h3: ({children}) => (
			<h3 id={slugger.slug(textContent(children))}>{children}</h3>
		),
		h4: ({children}) => (
			<h4 id={slugger.slug(textContent(children))}>{children}</h4>
		),
		h5: ({children}) => (
			<h5 id={slugger.slug(textContent(children))}>{children}</h5>
		),
		h6: ({children}) => (
			<h6 id={slugger.slug(textContent(children))}>{children}</h6>
		),
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
				let [, component] = nameMatch
				let tree = loading
				try {
					tree = require(`../../../../components/${component}/${filename}.md`)
				} catch (error) {
					setContent(`could not load ${filename}.md for ${component}`)
				}
				setContent(compile(tree).tree)
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
