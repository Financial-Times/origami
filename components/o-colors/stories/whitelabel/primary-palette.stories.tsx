
export default {
	title: 'Components/o-colors/Primary Palette',
	args: {},
	parameters: {
		html: {},
	},
};

export const PrimaryPalette = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-colors%406.6.2&demo=whitelabel-primary-palette&system_code=origami&brand=whitelabel"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
