export default {
	title: 'Maintained/o-topper/Featured Package Landing Page Topper',
	args: {},
	parameters: {
		html: {},
	},
};

export const FeaturedPackageLandingPageTopper = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-topper%406.0.7&demo=Package+Extra&system_code=origami&brand=core"
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
