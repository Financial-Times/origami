
export default {
	title: 'Components/o-topper/Center Aligned Full Bleed Image Topper',
	args: {},
	parameters: {
		html: {},
	},
};

export const CenterAlignedFullBleedImageTopper = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-topper%406.0.7&demo=Full+Bleed+Image+Center&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}