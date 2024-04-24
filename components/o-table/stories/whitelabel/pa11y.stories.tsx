
export default {
	title: 'Components/o-table/Pa11y',
	args: {},
	parameters: {
		html: {},
	},
};

export const Pa11y = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-table%409.1.0&demo=pa11y&system_code=origami&brand=whitelabel"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
