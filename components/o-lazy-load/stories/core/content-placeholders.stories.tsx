
export default {
	title: 'Components/o-lazy-load/Content Placeholders',
	args: {},
	parameters: {
		html: {},
	},
};

export const ContentPlaceholders = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-lazy-load%403.1.2&demo=placeholders&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
