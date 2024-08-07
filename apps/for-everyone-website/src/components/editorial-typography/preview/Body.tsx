import {Body} from '@financial-times/o3-editorial-typography/esm';

function BodyPreview() {
	return (
		<>
			<meta itemProp="@preview" />
					<Body>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet earum libero at voluptatum illum facere totam
						architecto eum porro exercitationem, ea, accusamus quia? Repellat beatae similique ab? Reprehenderit, ullam
						quae?
					</Body>
			<meta itemProp="@preview" />
		</>
	);
}

export const filePath =
	'src/components/editorial-typography/preview/Body.tsx';

export {BodyPreview as preview};
