import {Body} from '@financial-times/o3-foundation/esm';

function BodyPreview() {
	return (
		<>
			<meta itemProp="@preview" />
			<>
				<Body size="big">
					Body Big - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</Body>
				<Body size="standard">
					Body Standard - Lorem ipsum dolor sit amet, consectetur adipisicing
					elit.
				</Body>
				<Body size="small">
					Body Small - Lorem ipsum dolor sit amet, consectetur adipisicing elit.
				</Body>
				<Body size="small-caps">
					Body Small Caps - Lorem ipsum dolor sit amet, consectetur adipisicing
					elit.
				</Body>
				<Body size="small-bold">
					Body Small Bold - Lorem ipsum dolor sit amet, consectetur adipisicing
					elit.
				</Body>
			</>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath = 'src/components/typography/preview/Body.tsx';

export {BodyPreview as preview};
