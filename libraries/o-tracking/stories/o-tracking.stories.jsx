export default {
	title: "Brandless/o-tracking"
};

export const NoJavascript = () => {
	return (
		<>
			<div class="o-tracking o--if-no-js" data-o-component="o-tracking">
				<div
					style={{background: "url('https://spoor-api.ft.com/px.gif?data=YOUR_URL_ENCODED_JSON_DATA_HERE')"}}></div>
			</div>
			<div>
				<p>Check the HTML tab to see the code to track without JavaScript.</p>
			</div>
		</>
	);
};

