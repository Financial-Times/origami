
export default {
	title: 'Components/o-editorial-typography/Byline With Timestamp',
	args: {},
	parameters: {
		html: {},
	},
};

export const BylineWithTimestamp = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-editorial-typography%402.4.0&demo=byline&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
