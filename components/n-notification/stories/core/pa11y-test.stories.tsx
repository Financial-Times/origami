
export default {
	title: 'Components/n-notification/Pa11y test',
	args: {},
	parameters: {
		html: {},
	},
};

export const Pa11ytest = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=n-notification%408.2.5&demo=pa11y&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
