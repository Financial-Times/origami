import React from "react"

export default {
	component: {},
}
export const Intro = () => {
	return (
		<div>
			<p>Currently supported brands: </p>
			<ul>
				<li>Core</li>
				<li>Internal</li>
			</ul>
			<p>
				💡 Limitation: Addons in composed Storybooks might not work as they
				normally do in non-composed Storybook. But you can view each brand on
				it's own url where addons work as expected.
			</p>
			<p>
				💡 Tip: When you click 🌐 Browse components it will open set of brand components in a new tab,
				 but this pages are served from GitHub pages and you will need to add `/` at the end of url to correctly load it.
			</p>
		</div>
	)
}
