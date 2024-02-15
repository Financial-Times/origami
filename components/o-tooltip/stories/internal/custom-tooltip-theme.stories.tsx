
export default {
	title: 'Components/o-tooltip/Custom Tooltip Theme',
	args: {},
	parameters: {
		html: {},
	},
};

export const CustomTooltipTheme = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-tooltip%405.3.1&demo=custom&system_code=origami&brand=internal"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
