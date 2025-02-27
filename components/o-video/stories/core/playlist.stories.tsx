export default {
	title: "Maintained/o-video/Playlist",
	args: {},
	parameters: {
		html: {},
	},
};

export const Playlist = args => {
	return (
		<>
			<iframe
				loading="lazy"
				scrolling="yes"
				allowTransparency="true"
				src="https://www.ft.com/__origami/service/build/v3/demo?component=o-video%407.2.10&demo=playlist&system_code=origami&brand=core"
				title="Inline Live Demo"
				style={{
					height: "calc(100vh - 3rem)",
					"box-sizing": "border-box",
					border: "0",
					width: "100%",
				}}
			></iframe>
		</>
	);
};
