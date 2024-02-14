
export default {
	title: 'Components/o-fonts/Financier Display',
	args: {},
	parameters: {
		html: {},
	},
};

export const FinancierDisplay = args => {

	return (<>
		<iframe
			loading="lazy"
			scrolling="yes"
			allowTransparency="true"
			src="https://www.ft.com/__origami/service/build/v3/demo?component=o-fonts%405.3.4&demo=financierdisplayweb&system_code=origami&brand=core"
			title="Inline Live Demo"
			style={{
				height: 'calc(100vh - 3rem)',
				'box-sizing': 'border-box',
				border: '0',
				width: '100%',
			}}></iframe>
	</>);
}
