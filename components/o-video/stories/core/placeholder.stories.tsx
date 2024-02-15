
export default {
	title: 'Components/o-video/Placeholder',
	args: {},
	parameters: {
		html: {},
	},
};

export const Placeholder = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-video%407.2.10&demo=placeholder&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
