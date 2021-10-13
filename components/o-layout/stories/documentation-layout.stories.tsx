import {withDesign} from "storybook-addon-designs"
import {useEffect} from "react"
import {DocumentationLayout} from "../src/tsx/layout"
import javascript from "@financial-times/o-layout"
import "./layout.scss"
import {Header} from "@financial-times/o-header-services/stories/header.stories"
import {
	storyArgs,
	withNavigationArgs,
} from "@financial-times/o-header-services/stories/args"

export default {
	title: "Layout",
	component: DocumentationLayout,
	decorators: [withDesign],
	parameters: {
		layout: "fullscreen",
	},
}

export const Documentation = args => {
	useEffect(() => void javascript.init(), [])
	return (
		<DocumentationLayout
			header={<Header {...Header.args} />}
			footer={
				<footer>
					<small>i am a small footer</small>
				</footer>
			}>
			<h1>Getting Cozy</h1>
			<p>it's important to get very cozy</p>
			<h2>finding the correct pyjamas</h2>
			<p>
				you're going to want to head to primark and go to the disney section
			</p>
			<h3>Advanced: wearing pyjamas all the time</h3>
			<p>once you have the right pyjamas you might find...</p>
		</DocumentationLayout>
	)
}
