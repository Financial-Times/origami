export default {
	title: 'Maintained/o-toggle/Toggle display on off ',
	args: {},
	parameters: {
		html: {},
	},
};

export const Toggledisplayonoff = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-toggle%403.2.5&demo=display-toggle&system_code=origami&brand=internal"
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
