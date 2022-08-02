import React from "react"

export default {
	component: {},
}
export const Intro = () => {
	return (
		<div>
			<p>
				💡 Limitation: Addons in composed Storybooks might not work as they
				normally do in non-composed Storybook. But you can view each brand on
				it's own url where addons work as expected.
			</p>
			<p>Currently supported brands: </p>
			<ul>
				<li>Core</li>
				<li>Internal</li>
			</ul>
		</div>
	)
}
