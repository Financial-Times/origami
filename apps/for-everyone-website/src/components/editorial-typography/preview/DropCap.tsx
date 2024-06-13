import {Body} from '@financial-times/o3-editorial-typography/esm';

function DropCap() {
	return (
		<>
			<meta itemProp="@preview" />
			<Body dropCap={true}>
				Ttfn stands for "ta-ta for now", a phrase popularised by the character
				Tigger from "Winnie the Pooh." A capital "T" followed by a lower case
				"t" is also how we decided on the size and position of the drop cap.
				This was hard to find example copy for. Lorem ipsum dolor sit amet,
				consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
				et dolore magna aliqua.
			</Body>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/DropCap.tsx';

export {DropCap as preview};
