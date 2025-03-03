export default {
	title: 'Maintained/o-overlay/Modal without close button',
	args: {},
	parameters: {
		html: {},
	},
};

export const Modalwithoutclosebutton = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-overlay%404.2.10&demo=modal-prevent-closure&system_code=origami&brand=whitelabel"
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
