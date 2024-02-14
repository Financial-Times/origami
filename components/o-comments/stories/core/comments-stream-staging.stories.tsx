
export default {
	title: 'Components/o-comments/Comments Stream Staging',
	args: {},
	parameters: {
		html: {},
	},
};

export const CommentsStreamStaging = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-comments%4010.3.3&demo=comments-stream-staging&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
