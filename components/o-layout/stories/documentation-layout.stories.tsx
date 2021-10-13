import {withDesign} from "storybook-addon-designs"
import {useEffect} from "react"
import {DocumentationLayout} from "../src/tsx/layout"
import javascript from "../src/js/layout"
import "./layout.scss"
import {Header} from "@financial-times/o-header-services/src/tsx/header"

export default {
	title: "Layout",
	component: DocumentationLayout,
	decorators: [withDesign],
	parameters: {
		layout: "fullscreen",
	},
}

export const Documentation = args => {
	useEffect(() => {
		javascript.init()
	})

	return (
		<DocumentationLayout
			header={
				<Header title="Cool app" tagline="welcome to the chill out zone" />
			}
			footer={
				<footer>
					<small>i am a small footer</small>
				</footer>
			}>
			<h1>Getting Cozy</h1>
			<p>it's important to get very cozy</p>
			<h2 id="pyjama">finding the correct pyjamas</h2>
			<p>
				you're going to want to head to primark and go to the disney section
			</p>
			<h3 id="advanced-pyjama">Advanced: wearing pyjamas all the time</h3>
			<p>
				<strong>
					do not attempt this unless you know exactly what you are doing
				</strong>
			</p>
			<p>
				once you have found the correct pyjamas a number of new possibilities
				will open in your life
			</p>
		</DocumentationLayout>
	)
}
