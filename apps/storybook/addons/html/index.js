import React from "react"
import ReactDomServer from "react-dom/server"
import {addons, makeDecorator} from "@storybook/addons"

export const HTML_EVENT = "origami/html/content"

function Html({children}) {
	let html = ReactDomServer.renderToStaticMarkup(children)
	let channel = addons.getChannel()
	channel.emit(HTML_EVENT, html)
	return children
}

export default makeDecorator({
	name: "withHtml",
	parameterName: "html",
	skipIfNoParametersOrOptions: false,
	wrapper: (story, context) => {
		return <Html>{story(context)}</Html>
	},
})
