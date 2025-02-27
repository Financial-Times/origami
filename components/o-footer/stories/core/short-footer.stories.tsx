export default {
	title: 'Maintained/o-footer/Short footer',
	args: {},
	parameters: {
		html: {},
	},
};

export const Shortfooter = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-footer%409.2.8&demo=simple-footer&system_code=origami&brand=core"
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
