export default {
	title: 'Maintained/o-table/Expanding Table With Arrow Dock',
	args: {},
	parameters: {
		html: {},
	},
};

export const ExpandingTableWithArrowDock = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-table%409.1.0&demo=expanding-dock&system_code=origami&brand=internal"
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
