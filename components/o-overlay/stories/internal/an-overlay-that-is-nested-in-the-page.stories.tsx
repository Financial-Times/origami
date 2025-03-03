export default {
	title: 'Maintained/o-overlay/An overlay that is nested in the page',
	args: {},
	parameters: {
		html: {},
	},
};

export const Anoverlaythatisnestedinthepage = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-overlay%404.2.10&demo=sliding-notification&system_code=origami&brand=internal"
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
