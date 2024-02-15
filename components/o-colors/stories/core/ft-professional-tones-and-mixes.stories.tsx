
export default {
	title: 'Components/o-colors/FT Professional Tones and Mixes',
	args: {},
	parameters: {
		html: {},
	},
};

export const FTProfessionalTonesandMixes = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-colors%406.6.2&demo=core-professional-tones&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
