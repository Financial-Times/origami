export default {
	title: 'Maintained/o-toggle/Toggle visibility ',
	args: {},
	parameters: {
		html: {},
	},
};

export const Togglevisibility = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-toggle%403.2.5&demo=visibility-toggle&system_code=origami&brand=whitelabel"
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
