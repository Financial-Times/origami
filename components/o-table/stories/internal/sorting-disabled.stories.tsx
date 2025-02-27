export default {
	title: 'Maintained/o-table/Sorting Disabled',
	args: {},
	parameters: {
		html: {},
	},
};

export const SortingDisabled = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-table%409.1.0&demo=sorting-disabled&system_code=origami&brand=internal"
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
