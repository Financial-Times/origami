export default {
	title: 'Components/o-grid/Responsive Grid',
	args: {},
	parameters: {
		html: {},
	},
};

export const ResponsiveGrid = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-grid%406.1.7&demo=resized&system_code=origami&brand=internal"
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
