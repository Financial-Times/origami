export default {
	title: 'Deprecated/o-editorial-typography/Topic Tag',
	args: {},
	parameters: {
		html: {},
	},
};

export const TopicTag = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-editorial-typography%402.4.0&demo=topic-tag&system_code=origami&brand=core"
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
