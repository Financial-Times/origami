export default {
	title: 'Components/o-teaser-collection/Collection mid slice',
	args: {},
	parameters: {
		html: {},
	},
};

export const Collectionmidslice = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-teaser-collection%404.2.4&demo=mid-slice&system_code=origami&brand=core"
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
