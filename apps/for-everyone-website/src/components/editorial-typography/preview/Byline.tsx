import {Byline} from '@financial-times/o3-editorial-typography/esm';

function BylinePreview() {
	return (
		//<preview>
		<Byline>
				<a className="o3-editorial-typography-byline-author" href="#">
					Joe Doe
				</a>
				&nbsp;
				<span className="o3-editorial-typography-byline-location">
					in London
				</span>
				&nbsp;
				<time
					className="o3-editorial-typography-byline-timestamp"
					dateTime="2019-10-11T20:51:54Z"
					title="October 11 2019 9:51 pm">
					October 11 2019
				</time>
		</Byline>
		//</preview>
	);
}

export {BylinePreview as preview};
