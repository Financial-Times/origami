export default {
	title: 'Maintained/o-footer-services/Footer Logo and Content',
	args: {},
	parameters: {
		html: {},
	},
};

export const FooterLogoContent = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-footer-services%404.2.7&demo=footer-logo-content&system_code=origami&brand=whitelabel"
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
