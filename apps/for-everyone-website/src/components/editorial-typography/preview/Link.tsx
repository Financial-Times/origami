import {Link, Body} from '@financial-times/o3-editorial-typography/esm';

function LinkPreview() {
	return (
		//<preview>
		<Body>
			An article by <Link href="https://ft.com">The Financial Times</Link>.
		</Body>
		//</preview>
	);
}

export {LinkPreview as preview};
