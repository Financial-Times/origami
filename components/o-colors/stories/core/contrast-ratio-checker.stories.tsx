export default {
	title: 'Deprecated/o-colors/Contrast ratio checker',
	args: {},
	parameters: {
		html: {},
	},
};

export const Contrastratiochecker = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-colors%406.6.2&demo=core-contrast-checker&system_code=origami&brand=core"
				title="Inline Live Demo"
				style={{
					height: 'calc(100vh - 3rem)',
					'box-sizing': 'border-box',
					border: '0',
					width: '100%',
				}}></iframe>
		</>
	);
};
