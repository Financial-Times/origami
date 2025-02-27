export default {
	title: 'Maintained/o-lazy-load/Lazy loading picture elements',
	args: {},
	parameters: {
		html: {},
	},
};

export const Lazyloadingpictureelements = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-lazy-load%403.1.2&demo=pictures&system_code=origami&brand=core"
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
